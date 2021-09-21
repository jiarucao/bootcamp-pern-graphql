/**
 * db is our data access object, an abstraction layer on top of our PostgreSQL database
 * the ORM (object-relational mapper) that we are using is Sequelize
 */
import db from "../models/index";


/**
 * while our business logic is really simple so far, it is beneficial to keep it apart from the resolver logic
 * separation of concerns leads to maintainable code as the application grows, and also makes the code easier to unit test
 */

async function getRestaurantGroup(id) {
    /**
     * Restaurant is a Sequelize model, so we can use Sequelize methods like findByPk (find by primary key)
     * view the Sequelize v6 docs at https://sequelize.org/master/index.html for more available methods
     */
    return await db.RestaurantGroup.findByPk(id);
}

async function getRestaurantGroups() {
    return await db.RestaurantGroup.findAll();
}

async function createRestaurantGroup(id, name, description, restaurantIds) {
    return await db.RestaurantGroup.create({
        id,
        name,
        description,
        restaurantIds,
    });
}

async function updateRestaurantGroup(id, name, description, restaurantIds) {
    const updateResult = await db.RestaurantGroup.update({
        id,
        name,
        description,
        restaurantIds,
    },
    {
        returning: true,
        where: { id: id }
    });

    /**
     * Sequelize's update() method returns an array.
     * the first element is the number of records updated,
     * the second element is an array of the records updated */
    if (updateResult[0] === 1) {
        return updateResult[1][0];
    } else {
        return null;
    }
}

async function deleteRestaurantGroup(id) {
    const deleteResult = await db.RestaurantGroup.destroy({
        where: { id: id }
    });

    if (deleteResult === 1) {
        return id;
    } else {
        return null;
    }
}

const restaurantGroupService = { getRestaurantGroup, getRestaurantGroups, createRestaurantGroup, updateRestaurantGroup, deleteRestaurantGroup };
export default restaurantGroupService;
