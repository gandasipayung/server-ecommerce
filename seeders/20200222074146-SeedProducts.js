'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [
      {
        name: 'Alexandre Christie AC 8618 MD BBRBA',
        description: 'Classic Steel Black Dial Black Stainless Steel Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-8618-MDBBRBA/ACF-8618-MDBBRBA.jpg',
        price: 650000,
        stock: 20,
        CategoryId: 2
      },
      {
        name: 'Alexandre Christie AC 8618 MD BIPBA',
        description: 'Classic Steel Black Dial Black Stainless Steel Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-8618-MDBIPBA/ACF-8618-MDBIPBA.jpg',
        price: 617000,
        stock: 20,
        CategoryId: 2
      },
      {
        name: 'Alexandre Christie AC 8625 MH LSSSL',
        description: 'Classic Steel Men Silver Dial Dark Brown Leather Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-8625-MHLSSSL/ACF-8625-MHLSSSL.jpg',
        price: 552000,
        stock: 20,
        CategoryId: 2
      },
      {
        name: 'Alexandre Christie AC 9228 MH BBRBA',
        description: 'Digital Dial Black Mesh Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-9228-MHBIPBA/ACF-9228-MHBIPBA.jpg',
        price: 812000,
        stock: 20,
        CategoryId: 2
      },
      {
        name: 'Alexandre Christie AC 8603 LH BIPBU',
        description: 'Asteria Ladies Blue Dial Black Stainless Steel Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-8603-LHBIPBU/ACF-8603-LHBIPBU.jpg',
        price: 1040000,
        stock: 20,
        CategoryId: 3
      },
      {
        name: 'Alexandre Christie AC 8625 LH LRGSL',
        description: 'Classic Steel Silver Dial Brown Leather Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-8625-LHLRGSL/ACF-8625-LHLRGSL.jpg',
        price: 617000,
        stock: 20,
        CategoryId: 3
      },
      {
        name: 'Alexandre Christie AC 2831 BF BRGRG',
        description: 'Ladies Rose Gold Dial Rose Gold Stainless Steel Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-2831-BFBRGRG/ACF-2831-BFBRGRG.jpg',
        price: 845000,
        stock: 20,
        CategoryId: 3
      },
      {
        name: 'Alexandre Christie AC 9228 MH BRDBA',
        description: 'Digital Dial Red Mesh Strap',
        imageUrl: 'https://assets.jamtangan.com/images/product/alexandre-christie/ACF-9228-MHBRDBA/ACF-9228-MHBRDBA.jpg',
        price: 812000,
        stock: 20,
        CategoryId: 3
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
};
