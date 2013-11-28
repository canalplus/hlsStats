

<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Tests HLS CDN</title>
    <!-- Bootstrap-->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen"/>
    <link href="css/bootstrap.r7.css" rel="stylesheet" media="screen"/>
    <link href="css/style.css" rel="stylesheet" media="screen"/>
  </head>
  <body>
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container-fluid">
          <a href="./" class="brand">&#xE0E7;Analyse de flux HLS</a>
        </div>
      </div>
    </div>
    

    <div class="container">

      <div class="alert alert-info">
        Saisir une adresse vers une playlist HLS (finale).<br/>
      </div>

      <form id="genForm" class="form-horizontal" method="post">
        <div class="control-group">
          <label class="control-label" for="inputUrl">URL du flux HLS</label>
          <div class="controls">
            <input class="input-xxlarge" name="inputUrl" id="inputUrl" type="text" placeholder="">
          </div>
        </div>
        <div class="control-group">
          <div class="controls">
            <button type="button" id="analyzeBtn" class="btn">Analyser</button>
          </div>
        </div>
      </form>
    </div>

    <div class="container">
      <canvas id="graph" width="940px" height="300px"></canvas>
    </div>

    <div class="container">
      <div id="errors" class="alert alert-error"></div>
    </div>

    <div class="navbar-fixed-bottom">
      <hr/>
      <footer><p>&copy;<span class="can">&#xE0E0</span><span class="labs">&#xE0E1</span><span> 2013</span></p></footer>
    </div>
    <script src="http://code.jquery.com/jquery-latest.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/Charts.min.js"></script>
    <script src="js/script.js"></script>

  </body>
</html>
