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
        Header: 'Дата обновления',
        accessor: 'date_of_update',
    },
    {
        Header: 'Название',
        accessor: 'name',
    },
    {
        Header: 'Количество',
        accessor: 'value',
    },
    {
        Header: 'Глубина',
        accessor: 'deep',
    },
    {
        Header: 'Категория',
        accessor: ({categorys}) => {
            if (categorys !== undefined) {
                return categorys.reduce((accumulator, currentValue) => accumulator+currentValue.category+' ' ,'')
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



