class SQLBuilder {

    constructor (tableName, alias) {
        this.tableName = tableName || ''
        this.alias = alias || '' 
        this.fields = []
        this.conditions = []
        this.group = []
        this.order = []
        this.joins = []

    }

    setTableName (tableName, alias) {
        this.tableName = tableName
        this.alias = alias  
    }

    addField (fieldName, alias) {
        this.fields.push( alias ? `${alias}.${fieldName}` : fieldName )        
    }

    addConditionAND(leftOperand, condition, rightOperand) {
        this.conditions.push( ` AND ${leftOperand || '' } ${condition || '' } ${rightOperand || '' }`.trim() )                     
    }

    addConditionOR(leftOperand, condition, rightOperand) {
        this.conditions.push( ` OR ${leftOperand || '' } ${condition || '' } ${rightOperand || '' }`.trim() )                     
    }

    addGroupBy (fieldName, alias) {
        this.group.push( alias ? `${alias}.${fieldName}` : fieldName )        
    }

    addOrderBy (fieldName, order) {
        this.order.push( order ? `${fieldName} ${order}` : fieldName )        
    }

    addJoin (tableName, alias, leftOperand, rightOperand, condition, joinType) {
        this.joins.push( `${joinType || ''} JOIN ${tableName} AS ${alias} ON ` + 
            (rightOperand ? `${leftOperand} ${condition ? condition : ' = '} ${rightOperand}` : leftOperand  ))        
    }

    addLeftJoin(tableName, alias, leftOperand, rightOperand, condition) {
        this.addJoin (tableName, alias, leftOperand, rightOperand, condition, "LEFT")
    }

    addRightJoin(tableName, alias, leftOperand, rightOperand, condition) {
        this.addJoin (tableName, alias, leftOperand, rightOperand, condition, "RIGHT")
    }


    getSQL() {
        return `SELECT ${this.fields.join(', ')} \nFROM ${this.tableName}` +
        ` \nWHERE (1=1) ${this.conditions.join(' ')}` +  
        (this.joins.length > 0 ?`\n ${this.joins.join('\n')}` : '') + 
        (this.group.length > 0 ?`\nGROUP BY ${this.group.join(', ')}` : '') + 
        (this.order.length > 0 ?`\nORDER BY ${this.order.join(', ')}` : '')  
    }  
}


let sql = new SQLBuilder('companies', 'C')
sql.addField('id', 'C')
sql.addField('title', 'C')
sql.addConditionAND('C.title', '=', '$1')
sql.addConditionOR('id <> 10')
sql.addGroupBy('title', 'C')
sql.addOrderBy('title', 'ASC')
sql.addLeftJoin('items', 'i', 'c.id', 'i.companies')
sql.addJoin('items', 'i', 'c.id', 'i.companies')
//sql.#addFields1()
//sql.tableName = 'XC'
console.log(sql.getSQL())