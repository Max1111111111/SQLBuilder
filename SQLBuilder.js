class SQLBuilder {

    constructor (tableName, alias) {
        this.tableName = tableName || ''
        this.alias = alias || '' 
        this.fields = []
        this.conditions = []
    }

    setTableName (tableName, alias) {
        this.tableName = tableName
        this.alias = alias  
    }

    addField (fieldName, alias) {
        this.fields.push( alias ? `${alias}.${fieldName}` : fieldName )        
    }
    
    getSQL() {
        return `SELECT ${this.fields.join(', ')} \nFROM ${this.tableName}` 
    }  
}


let sql = new SQLBuilder('companies', 'C')
sql.addField('id', 'C')
sql.addField('title', 'C')
//sql.tableName = 'XC'
console.log(sql.getSQL())