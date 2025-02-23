const allUserAuditLogRows = []

for (let i = 0; i <= 4; i++) {
    allUserAuditLogRows.push({
        id: `user_${i+1}_id`,
        user: {
            label: `Diganta ${i+1}`,
            link: '/admin/users/diganta'
        },
        activity: 'View Profile',
        time: '2mins ago'
    })
}

export default {
    config: {
        id: "",
        label: "",
        defaultFilters: {
            currPage: 1,
            perPage: 5
        },
        "columns": {
            "order": [
                "user",
                "module",
                "moduleAction",
                "time",
                "description"
            ],
            "user": {
                "label": "User",
                "renderType": "link"
            },
            "module": {
                "label": "Module",
                "renderType": "text"
            },
            "moduleAction": {
                "label": "Action",
                "renderType": "text"
            },
            "activity": {
                "label": "activity",
                "renderType": "text"
            },
            "time": {
                "label": "Time",
                "renderType": "text"
            },
            "description":{
                "label": "Description",
                "renderType": "text"  
            }
        }
    },
    data: {
        totalRecords: 9,
        rows: allUserAuditLogRows
    }
}