export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
    },
    {
        Header: 'Дата создания',
        accessor: 'date',
    },
    {
        Header: 'Название',
        accessor: 'name',
    },
    {
        Header: 'Количество контактов',
        accessor: 'value',
    },
    {
        Header: 'Категория',
        accessor: ({categorys}) => {
            if (categorys !== undefined && categorys.length > 0) {
                return categorys.reduce((accumulator, currentValue, index) => {
                    let separator = index === categorys.length - 1 ? '' : ', ';
                    return accumulator + currentValue.category + separator;
                },'');
            } else {
                return ''
            }
        },
    }
]

export const COLUMNS_STATUS = [
    {
        Header: 'Cтатус',
        accessor: 'status',
    },
    {
        Header: 'Дата',
        accessor: 'status_date',
    },
    {
        Header: 'Время',
        accessor: 'status_time',
    },
]



