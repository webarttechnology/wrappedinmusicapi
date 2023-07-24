'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_no: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      song_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DOUBLE(8, 2),
        allowNull: false,
      },
      is_ownscript: {
        type: Sequelize.ENUM("1", "2"),
        allowNull: true,
      },
      script_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true,
      },
      music_file: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      add_position: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      duration: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fulfillment_status: {
        type: Sequelize.ENUM("1", "0"),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("1", "0"),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};