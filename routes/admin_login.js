/**
 * Created by KH9143 on 09-02-2016.
 */
/**
 * Created by KH9143 on 27-12-2015.
 */
var express = require('express');
var router = express.Router();
var pg = require('pg');
var results = [];


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin_login');
});

router.post('/companies',function(req,res,next) {
    /*console.log("....start");
     console.log(JSON.stringify(req.body));
     console.log(req.body.ctc);
     console.log("....stop");*/
    var connect_string = "postgres://postgres:prem@localhost:5432/tnp";

    var client = new pg.Client(connect_string);
    client.connect();


    pg.connect(connect_string, function(err, client, done) {

        console.log(JSON.stringify(req.body));
        console.log(req.body.ctc);
        // SQL Query > Delete Data
        var query = client.query("INSERT INTO placement_drives (company_name, company_table_name, logo_url, company_description,job_description, ctc," +
            " date_of_drive, company_type, job_role, process, venue, reporting_time, branches, btech_cutoff)" +
            " VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);",[req.body.companyName, req.body.companyName, ' ', req.body.companyDescription,req.body.jobDescription, req.body.ctc, req.body.dateOfPlacementDrive, req.body.companyType, req.body.jobRole,req.body.driveProcess, req.body.venue, req.body.reportingTime, req.body.branchNames, req.body.cutoff_cgpa]);

        query.on('end', function() {
            done();
            console.log("first query execution done");
        });
        console.log("came after first one");
        //results = [];
        for (i in req.body.branchNames)
        {
            var query_branch = client.query("SELECT * FROM mdb WHERE (btech_percentage>= $1 AND branch= $2);",[req.body.cutoff_cgpa*10,req.body.branchNames[i]]);
            query_branch.on('row', function (row) {
                console.log("pushing....."+row);
                results.push(row);

            });

            console.log(req.body.branchNames[i]);

        }
        console.log("outside"+results);
        //var fetch_query = client.query("SELECT * FROM ")
        // Stream results back one row at a time
        /*query.on('row', function(row) {

         results.push(row);

         });*/
        //console.log(yac);
        //console.log("results",results);

        // After all data is returned, close connection and return results
        query_branch.on('end', function() {
            done();
            console.log("END");
            return res.json({result:results});
        });



        console.log("clearing...");
        results = [];
        console.log("cleared....");
    });


});










router.post('/',function(req,res,next) {
    console.log(req.body.name);
    /**Verify if the user is present in the database and if
     * present then return failure else, create the user and
     * return success.
     * @type {{success: boolean, date: Date, reason: string}}
     */
    response_json = {json_res:["gali","sagar","gali"]};
    res.send(response_json);
});

module.exports = router;
