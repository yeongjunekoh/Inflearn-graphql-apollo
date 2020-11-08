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

const dbWorks = {
    getTeams: (args) => dataFiltered('teams', args)
        .map((team) => {
            team.members = dbWorks.getPeople({team: team.id})
            return team
        }),
    postTeam: (args) => {
        const newTeam = {
            id: Math.max(database.teams.map((team) => {
                return Number(team.id)
            })),
            ...args
        }
        database.teams.push(newTeam)
        return newTeam
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

    getRoles: (args) => dataFiltered('roles', args),
    postRole: (args) => {
        database.roles.push(args)
        return args
    },

    getEquipments: (args) => dataFiltered('equipments', args),
    postEquipment: (args) => {
        database.equipments.push(args)
        return args
    },

    getSoftwares: (args) => dataFiltered('softwares', args),
    postSoftware: (args) => {
        database.softwares.push(args)
        return args
    },

    getSupplies: (args) => dataFiltered('supplies', args),
    postSupply: (args) => {
        database.supplies.push(args)
        return args
    }

}

module.exports = dbWorks