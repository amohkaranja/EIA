<!-- Database Connection -->
<?php
$username = "root"; 
$password = "";
$hostname = "localhost";
$databasename = 'endeavors_insurance_agency';
$sql_error = "Mysql connection is incorrect";

$link = mysqli_connect($hostname,$username,$password)
 or die($sql_error);

$query_db = mysqli_select_db($link, $databasename);

if (!$query_db)
{
  die ("Database was not found");
}
// else{
//     echo "Success";
// }
?>