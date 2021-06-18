const pool = require('../db/index').pool;

const users = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        await pool.query(
            "INSERT INTO users(username, password, role) VALUES ($1, $2, $3)", [username, password, role]
        );
        res.json("new user inserted successfully");
    } catch (err) {
        console.error(err.message);
        res.json("API Error");
    }
}

const leads = async (req, res) => {
    const { user_id } = req.params;
    const { lead_id, phone_number } = req.body;
    try {
        await pool.query(
            "INSERT INTO leads(user_id, lead_id, phone_number, timestamp) VALUES ($1, $2, $3, $4)", [user_id, lead_id, phone_number, 'NOW']
        );
        res.json("new lead inserted successfully");
    } catch (err) {
        console.error(err.message);
        res.json("API Error");
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const login = await pool.query("SELECT id, username, role FROM users WHERE username = $1 AND password = $2", [username, password]);
        if (login.rows[0] == null) {
            res.json("user doesn't exist");
        } else {
            res.json(login.rows[0]);
        }
    } catch (err) {
        console.error(err.message);
        res.json("API Error");
    }
}

const leadsStats = async (req, res) => {
    var { agent_id } = req.params;

    if (agent_id == 0) {
        agent_id = null;
    }

    try {
        // const leadsStats = await pool.query("SELECT (select array_to_json(array_agg(row_to_json(l_stats))) from (select (select row_to_json(uInfo) from (select u.id as agent_id, u.username as agent_name from users u where u.id = l.user_id )uInfo) as agent_info, count(*) as total_leads from leads l where ($1::int is null or l.user_id = $1) group by l.user_id) l_stats) as agent_stats", [agent_id]);

        const leadsStats = await pool.query("select u.username as agent, count(l.user_id) as leads from leads l inner join users u on u.id = l.user_id where ($1::int is null or l.user_id = $1) group by u.username order by u.username", [agent_id]);
        res.json(leadsStats.rows);
    } catch (err) {
        console.error(err.message);
        res.json("API Error");
    }
}

const leadsFilter = async (req, res) => {
    var { start_date, end_date } = req.params;

    try {
        if (start_date == 0 && end_date == 0) {
            const totalLeads = await pool.query("SELECT count(*) as total_leads from leads");
            res.json(totalLeads.rows[0]);
        } else {
            const leadsStats = await pool.query("SELECT count(*) as leads_between_dates from leads where timestamp::date BETWEEN $1 AND $2", [start_date, end_date]);
            res.json(leadsStats.rows[0]);
        }

    } catch (err) {
        console.error(err.message);
        res.json("API Error");
    }
}

module.exports = {
    users,
    leads,
    login,
    leadsStats,
    leadsFilter,
}