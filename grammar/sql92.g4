grammar sql92;

program: (query)*
    ;

query: 'CREATE' 'DATABASE' ID
        | 'ALTER' 'DATABASE' ID 'RENAME' 'TO' ID
        | 'DROP' 'DATABASE' ID
        | 'SHOW' 'DATABASES'
        | 'USE' 'DATABASE' ID
        | 'CREATE' 'TABLE' ID '(' (columnDeclaration (','columnDeclaration)*)* ',' (constraintDeclaration(','constraintDeclaration)*)* ')'
        | 'ALTER' 'TABLE' ID 'RENAME' 'TO' ID
        | 'ALTER' 'TABLE' ID (action)?
        | 'DROP' 'TABLE' ID
        | 'SHOW' 'TABLES'
        | 'SHOW' 'COLUMNS' 'FROM' ID
        ;
columnDeclaration: ID dataType;

dataType: 'INT'
            | 'FLOAT'
            | 'DATE'
            | 'CHAR' '(' NUM ')';

constraintDeclaration: 'CONSTRAINT' constraint;

constraint: 'PK_' ID 'PRIMARY' 'KEY' '(' (ID (','ID)* | )')'
            | 'FK_' ID 'FOREIGN KEY' '(' (ID (','ID)* | )')' 'REFERENCES' ID '(' (ID (','ID)* | )')'
            | 'CH_' ID 'CHECK' '(' expression ')'
            ;
action: 'ADD' 'COLUMN' ID dataType constraintDeclaration
        | 'ADD' constraintDeclaration
        | 'DROP' 'COLUMN' ID
        | 'DROP' 'CONSTRAINT' ID
        ;


expression
    :   '(' expression ')'
    |   NUM
    |   ID
    |   'NOT' expression
    |   expression rel_op expression
    |   expression 'AND' expression
    |   expression 'OR' expression
    ;

rel_op :'<'|'>'|'<='|'>='|'<>'|'=' ;
ID : [a-zA-Z] [a-zA-Z0-9]* ;
WS : [ \t\r\n]+ -> skip ;
NUM : [0-9] [0-9]*;
