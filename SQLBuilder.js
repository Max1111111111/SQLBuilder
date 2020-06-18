class SQLBuilder {

    constructor (tableName, alias) {
        this.tableName = tableName || ''
        this.alias = alias || '' 
        this.fields = []
        this.conditions = []
        this.group = []
        this.order = []

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

    addOrderbyBy (fieldName, order) {
        this.order.push( alias ? `${fieldName} ${order}` : fieldName )        
    }

    getSQL() {
        return `SELECT ${this.fields.join(', ')} \nFROM ${this.tableName} \nWHERE (1=1) ${this.conditions.join(' ')}` + 
        `\nGROUP BY ${this.group.join(', ')}`  
    }  
}


let sql = new SQLBuilder('companies', 'C')
sql.addField('id', 'C')
sql.addField('title', 'C')
sql.addConditionAND('C.title', '=', '$1')
sql.addConditionOR('id <> 10')
//sql.#addFields1()
//sql.tableName = 'XC'
console.log(sql.getSQL())