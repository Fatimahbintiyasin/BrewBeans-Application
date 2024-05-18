import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

const executeSQL = async (sql, bindParams = []) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute(sql, bindParams);
        connection.close();
        return result;
    } catch (error) {
        console.error('Error executing SQL:', error);
        throw error;
    }
};

const checkIfExists = async (sql, bindParams) => {
    try {
        const result = await executeSQL(sql, bindParams);
        const rowCount = result.rows[0][0];
        return rowCount > 0;
    } catch (error) {
        return false;
    }
};

const createObjectIfNotExists = async (objectName, objectType, objectSQL) => {
    try {
        const objectExists = await checkIfExists(
            `SELECT COUNT(*) FROM all_objects WHERE object_name = :objectName AND object_type = :objectType`,
            [objectName, objectType.toUpperCase()]
        );
        // console.log('createObjectIfNotExist: ' + objectExists);

        if (!objectExists) {
            await executeSQL(objectSQL);
            console.log(`${objectName} ${objectType} created successfully.`);
        } else {
            console.log(`${objectName} ${objectType} already exists.`);
        }
    } catch (error) {
        console.error(`Error creating stored ${objectType} ${objectName}:`, error);
        throw error;
    }
};

const createStoredProcedure = async (procedureName, procedureSQL) => {
    await createObjectIfNotExists(procedureName, 'procedure', procedureSQL);
};


const createStoredFunction = async (functionName, functionSQL) => {
    await createObjectIfNotExists(functionName, 'function', functionSQL);
};

const createStoredType = async (typeName, typeSQL) => {
    await createObjectIfNotExists(typeName, 'type', typeSQL);
};


const runScript = async (sqlScript) =>{

    try {
        const connection = await oracledb.getConnection(dbConfig);

        const statements = sqlScript.split(';').filter(statement => statement.trim() !== '');
        for (const statement of statements) {
            await connection.execute(statement);
            console.log('Executed:', statement);
        }

        await connection.close();
        console.log('Script execution completed.');


    } catch (error) {
        console.error('Error:', error.message);
    }
}




export {

    createStoredProcedure,
    createStoredFunction,
    createStoredType,
    runScript
};
