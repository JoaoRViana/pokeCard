const weakness = {
    normal:['fighting'],
    fire:['water','ground','rock'],
    water:['grass','electric'],
    grass:['fire','ice','poison','flying','bug'],
    electric:['ground'],
    ice:['fire','fighting','rock','steel'],
    fighting:['flying','psychic','fairy'],
    poison:['ground','psychic'],
    ground:['water','grass','ice'],
    flying:['electric','ice','rock'],
    psychic:['bug','ghost','dark'],
    bug:['flying','rock','fire'],
    rock:['water','grass','fighting','ground','steel'],
    ghost:['ghost','dark'],
    dragon:['ice','dragon','fairy'],
    dark:['fighting','bug','fairy'],
    steel:['fire','fighting','ground'],
    fairy:['poison','steel'],
}
const resitances = {
    normal:['ghost'],
    fighting:['rock','bug','dark'],
    flying:['fighting','ground','bug','grass'],
    poison:['fighting','poison','bug','grass','fairy'],
    ground:['poison','rock','electric'],
    rock:['normal','flying','poison','fire'],
    bug:['fighting','ground','grass'],
    ghost:['normal','fighting','poison','bug'],
    steel:['normal','flying','poison','rock','bug','steel','grass','psychic','ice','dragon','fairy'],
    fire:['bug','steel','fire','grass','ice','fairy'],
    water:['steel','fire','water','ice'],
    grass:['ground','water','grass','electric'],
    electric:['flying','steel','electric'],
    psychic:['fighting','psychic'],
    ice:['ice'],
    dragon:['fire','water','grass','electric'],
    dark:['ghost','psychic','dark'],
    fairy:['fighting','bug','dragon','dark'],
}
export {
    weakness,
    resitances
}