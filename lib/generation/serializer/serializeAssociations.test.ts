import { cloneDeep } from 'lodash';
import { Client } from 'pg';
import introspectDb from '../../introspection/introspectDb';
import connectTestDb from '../../test/connectTestDb';
import createModels from '../createModels';
import createRelationships from '../createRelationships';
import serializeAssociations, {
  serializeManyToOne,
  serializeOneToMany,
  serializeOneToOne,
} from './serializeAssociations';
/* eslint-disable @typescript-eslint/no-non-null-assertion */

describe('serializeAssociations', () => {
  let client: Client;
  let User: Superluminal.Model;
  let Account: Superluminal.Model;
  let Photo: Superluminal.Model;
  const models: Superluminal.Models = {};
  let associationMapping: Superluminal.AssociationMapping;
  beforeAll(async (done) => {
    client = await connectTestDb();
    const introspection = await introspectDb(client, ['superluminal']);

    associationMapping = {
      manyToOnes: {},
      oneToManys: {},
    };
    await createModels(models, introspection, { output: '.tmp' }, false);

    createRelationships(models, introspection, associationMapping);

    User = models.user;
    Account = models.account;
    Photo = models.photo;
    done();
  });

  afterAll(() => {
    return client.end();
  });

  describe('OneToOne', () => {
    it('serializes OneToOnes', () => {
      expect(
        serializeOneToOne(
          'account',
          User.oneToOnes!.account,
          Account.columns,
          associationMapping
        )
      ).toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;"
      `);
    });
  });

  describe('ManyToOne', () => {
    describe('when model already has a column with the same name', () => {
      it('increments the column name', () => {
        const ClonePhoto = cloneDeep(Photo);

        ClonePhoto.columns.user = {
          type: 'text',
          dataType: 'text',
          name: 'user',
          nullable: false,
        };

        ClonePhoto.columns.user2 = {
          type: 'text',
          dataType: 'text',
          name: 'user',
          nullable: false,
        };

        const serialized = serializeManyToOne(
          'user',
          ClonePhoto.manyToOnes!.user,
          ClonePhoto,
          associationMapping
        );

        expect(serialized).toMatchInlineSnapshot(`
          "  @ManyToOne(
              () => User,
              user => user.photos,
              { onDelete: 'NO ACTION' }
            )
            @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
            photo: User;"
        `);
      });
    });
    it('serializes ManyToOnes', () => {
      expect(
        serializeManyToOne(
          'user',
          Photo.manyToOnes!.user,
          Photo,
          associationMapping
        )
      ).toMatchInlineSnapshot(`
        "  @ManyToOne(
            () => User,
            user => user.photos,
            { onDelete: 'NO ACTION' }
          )
          @JoinColumn([{ name: 'user_id', referencedColumnName: 'slug' }])
          photo: User;"
      `);
    });
  });

  describe('OneToMany', () => {
    it('serializes OneToManys', () => {
      expect(
        serializeOneToMany('photo', User.oneToManys!.photo, associationMapping)
      ).toMatchInlineSnapshot(`
        "  @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];"
      `);
    });
  });

  describe('serializeAssociations', () => {
    it('serializes all associations', () => {
      expect(serializeAssociations(User, models, associationMapping))
        .toMatchInlineSnapshot(`
        "  @OneToOne(() => Account, (account) => account.userSlug)
          account: Account;

          @OneToMany(() => Photo, (photo) => photo.user)
          photos: Photo[];

          @OneToMany(() => Shipment, (shipment) => shipment.fromBySlug)
          shipmentsByFrom: Shipment[];

          @OneToMany(() => Shipment, (shipment) => shipment.toBySlug)
          shipmentsByTo: Shipment[];

          @OneToMany(() => Transaction, (transaction) => transaction.user)
          transactions: Transaction[];"
      `);
    });
  });
});
