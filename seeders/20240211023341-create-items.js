'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Items', [
      {
        name: "Mie Ayam Bakso GACOR KANG",
        slug: "mie-ayam",
        description: "Mie Ayam Bang Alan Lezat Bergizi Berlemak Berminyak Menggugah Selera",
        price: 15000,
        stock: 50,
        status: "available",
        image: "https://allofresh.id/blog/wp-content/uploads/2023/08/cara-membuat-mie-ayam-4-780x470.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Nasi Goreng Spesial Abang-Ayang",
        slug: "nasi-goreng",
        description: "Nasi Goreng dengan bumbu rempah pilihan, disajikan dengan telur mata sapi dan irisan ayam panggang",
        price: 20000,
        stock: 30,
        status: "available",
        image: "https://allofresh.id/blog/wp-content/uploads/2023/08/cara-membuat-mie-ayam-4-780x470.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Es Teh Manis Segar",
        slug: "es-teh",
        description: "Es Teh dengan rasa manis alami, cocok disajikan untuk melepas dahaga di siang hari",
        price: 5000,
        stock: 100,
        status: "available",
        image: "https://allofresh.id/blog/wp-content/uploads/2023/08/cara-membuat-mie-ayam-4-780x470.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sate Ayam Madura Mantap",
        slug: "sate-ayam",
        description: "Sate Ayam dengan bumbu rempah khas Madura, disajikan dengan lontong dan bumbu kacang",
        price: 25000,
        stock: 20,
        status: "available",
        image: "https://allofresh.id/blog/wp-content/uploads/2023/08/cara-membuat-mie-ayam-4-780x470.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Martabak Telur Keju Spesial",
        slug: "martabak-telur",
        description: "Martabak Telur dengan taburan keju parut dan bumbu rempah khas, enak dinikmati sebagai camilan malam",
        price: 30000,
        stock: 15,
        status: "available",
        image: "https://allofresh.id/blog/wp-content/uploads/2023/08/cara-membuat-mie-ayam-4-780x470.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {})
  }
};
