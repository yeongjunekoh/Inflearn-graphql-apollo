const database = require('./database.js')

const dataFiltered = (which, args) => {
    let result = database[which].filter((item) => {
        // 조건인자가 없거나, 페이징 관련 인자거나
        // 모든 요소가 아이템과 모두 일치하면 통과
        return !args || Object.keys(args).reduce((a, b) => {
            return a && (
                ['page', 'per_page'].includes(b) ||
                item[b] == args[b]
            )
        }, true)
    })

    // 페이징
    if (args.page && args.per_page) {
        result = result.slice(
            (args.page - 1) * args.per_page, 
            args.page * args.per_page)
    }

    return result
}

const deleteItem = (which, args) => {
    const deleted = database[which].filter((item) => {
        return item.id == args.id
    })[0]
    database[which] = database[which].filter((item) => {
        return item.id != args.id
    })
    return deleted
}

const dbWorks = {
    getTeams: (args) => dataFiltered('teams', args)
        .map((team) => {
            team.members = dbWorks.getPeople({team: team.id})
            return team
        }),
    postTeam: (args) => {
        const newTeam = {
            id: database.teams.map((team) => {
                return Number(team.id)
            }).reduce((a, b) => {
                return Math.max(a, b)
            }, 0) + 1,
            ...args.input
        }
        database.teams.push(newTeam)
        return newTeam
    },
    editTeam: (args) => {
        return database.teams.filter((team) => {
            return team.id == args.id
        }).map((team) => {
            Object.assign(team, args.input)
            return team 
        })[0]
    },

    getPeople: (args) => dataFiltered('people', args) 
        .map((person) => {
            person.tools = [
                ...dbWorks.getEquipments({used_by: person.role}),
                ...dbWorks.getSoftwares({used_by: person.role})
            ]
            person.givens = [
                ...dbWorks.getEquipments({used_by: person.role}),
                ...dbWorks.getSupplies({team: person.team})
            ]
            return person
        }),
    postPerson: (args) => {
        const newPerson = {
            id: database.people.map((person) => {
                return Number(person.id)
            }).reduce((a, b) => {
                return Math.max(a, b)
            }, 0) + 1,
            ...args.input
        }
        database.people.push(newPerson)
        return newPerson
    },
    editPerson: (args) => {
        return database.people.filter((person) => {
            return person.id == args.id
        }).map((person) => {
            Object.assign(person, args.input)
            return person 
        })[0]
    },

    getRoles: (args) => dataFiltered('roles', args),
    postRole: (args) => {
        database.roles.push(args)
        return args
    },
    editRole: (args) => {
        return database.Roles.filter((role) => {
            return role.id == args.id
        }).map((role) => {
            Object.assign(role, args)
            return role
        })[0]
    },

    getEquipments: (args) => dataFiltered('equipments', args),
    postEquipment: (args) => {
        database.equipments.push(args)
        return args
    },
    editEquipment: (args) => {
        return database.equipments.filter((equipment) => {
            return equipment.id == args.id
        }).map((equipment) => {
            Object.assign(equipment, args)
            return equipment
        })[0]
    },
    increaseEquipment: (args) =>{
        return database.equipments.filter((equipment) => {
            return equipment.id == args.id
        }).map((equipment) => {
            equipment.count += args.increase 
            return equipment
        })[0]

    },

    getSoftwares: (args) => dataFiltered('softwares', args),
    postSoftware: (args) => {
        database.softwares.push(args)
        return args
    },
    editSoftware: (args) => {
        return database.softwares.filter((software) => {
            return software.id == args.id
        }).map((software) => {
            Object.assign(software, args)
            return software 
        })[0]
    },

    getSupplies: (args) => dataFiltered('supplies', args),
    postSupply: (args) => {
        database.supplies.push(args)
        return args
    },
    editSupply: (args) => {
        return database.supplies.filter((supply) => {
            return supply.id == args.id
        }).map((supply) => {
            Object.assign(supply, args)
            return supply
        })[0]
    },

    deleteItem: deleteItem

}

module.exports = dbWorks