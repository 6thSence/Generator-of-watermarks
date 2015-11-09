<?php
	session_start();
	include_once 'php/config.php';
	include_once 'php/functions.php';
	include_once 'php/lang.php';

	$lang_param = $_GET['lang'];
	if($lang_param) {
		$_SESSION['lang'] = $lang_param;
	}

	$current_language = $_SESSION['lang'];
	if(!$current_language || !$lang[$current_language]) {
		$_SESSION['lang'] = $default_language;
		$current_language = $default_language;
	}

	$text = $lang[$current_language];
?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="ru-RU">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title><?php echo $text['title'] ?></title>
		<!-- ***** seo ******-->
		<meta name="description" content="Генерация водяных знаков">
		<meta name="keywords" content="">
		<meta name="author" content="">
		<!-- ***** favicon ******-->
		<!-- ***** css ******-->
		<link rel="stylesheet" href="css/main.css">
		<link rel="stylesheet" href="bower/jquery-ui/themes/flick/jquery-ui.min.css">
		<!-- ***** js ******-->
	</head>
	<body>
		<div class="wrapper-all">
			<div class="wrapper">
				<div class="left__btn-group">
					<div class="lang">
						<div class="lang__btn-wrap"><a href="ru" class="lang__btn">РУС</a></div>
						<div class="lang__btn-wrap"><a href="en" class="lang__btn">ENG </a></div>
					</div>
					<div class="share">
						<div class="share__btn-wrap"><a href="" alt="facebook" id="fb-share" class="share__btn share__btn_fb fb-share"></a>
							<div class="share__btn-wrap"><a href="" alt="facebook" class="share__btn share__btn_like fb-share"></a></div>
						</div>
						<div class="share__btn-wrap"><a href="" alt="tweeter" id="tw-share" class="share__btn share__btn_tw"></a></div>
						<div class="share__btn-wrap"><a href="" alt="vkontacte" id="vk-share" class="share__btn share__btn_vk"></a></div>
					</div>
				</div>
				<div class="container cl">
					<div class="main-bl">
						<div style="opacity: 1;" class="main-title"><?php echo $text['title'] ?></div>
						<div data-bg="watermark-work-rus" class="watermark-work">
							<div class="aim-img"></div>
						</div>
					</div>
					<div class="controls-bl">
						<h3 class="controls-title"><?php echo $text['settings'] ?></h3>
						<form id="form" class="form">
							<input type="hidden" name="aim-img">
							<input type="hidden" name="watermark">
							<input type="hidden" name="opacity" value="1">
							<input type="hidden" name="mode">
							<div class="form__group">
								<div class="form__group-wrap group-wrap__image">
									<label class="form__label original-image"><?php echo $text['image'] ?></label>
									<div class="file-holder">
										<p class="file-holder__name mainImg">Image.jpg</p>
										<div class="file-holder__btn"><img src="../img/images/cloud.png" alt="" class="file__up-img"></div>
										<input id="fileuploadImage" type="file" name="files[]" data-url="server/php/" data-position="left" title="изображение" data-file-name-input="#image" class="file__up">
									</div>
									<label class="form__label watermark-image"><?php echo $text['watermark'] ?></label>
									<div class="file-holder">
										<p class="file-holder__name mainWatermark">Image.png</p>
										<div class="file-holder__btn"><img src="../img/images/cloud.png" alt="" class="file__up-img"></div>
										<input id="watermark" type="file" name="files[]" data-url="server/php/" data-position="left" title="изображение" data-file-name-input="#watermark" disabled class="file__up">
									</div>
								</div>
							</div>
							<div class="form__group">
								<div class="form__group-wrap group-wrap__placement">
									<header class="header__placement">
										<label class="form__label place-title"><?php echo $text['position'] ?></label><span class="place-title__change-view">
											<div class="radio">
												<form class="radio__list">
													<div class="radio__item">
														<input type="radio" id="true" value="true" name="tiling" class="radio__tiling_input radio__tiling_input_true" disabled="disabled">
														<label for="true" class="radio__tiling radio__tiling_true"></label>
													</div>
													<div class="radio__item">
														<input type="radio" id="false" value="false" name="tiling" checked="checked" class="radio__tiling_input radio__tiling_input_false" disabled="disabled">
														<label for="false" class="radio__tiling radio__tiling_false"></label>
													</div>
												</form>
											</div></span>
									</header>
									<div class="position-select__wrap">
										<div class="position-select__choose choose-position">
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
											<div class="choose-position__item"></div>
										</div>
										<div class="position-select__choose count-position">
											<div class="input-group_count">
												<label for="moveX" class="input-group__label_count count-position__item_xxx"></label>
												<input id="moveX" name="value_x" value="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item">
												<div class="dif__btn-group"><a tabindex="-1" role="button" id="moveXincrease" class="position__choose position__choose-increase"></a><a tabindex="-1" role="button" id="moveXreduce" class="position__choose position__choose-reduce"></a></div>
											</div>
											<div class="input-group_count">
												<label for="moveY" class="input-group__label_count count-position__item_yyy"> </label>
												<input id="moveY" name="value_y" value="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item">
												<div class="dif__btn-group"><a tabindex="-1" role="button" id="moveYincrease" class="position__choose position__choose-increase"></a><a tabindex="-1" role="button" id="moveYreduce" class="position__choose position__choose-reduce"></a></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="form__group">
								<div class="form__group-wrap group-wrap__transparency">
								    <label class="form__label transparency-title"><?php echo $text['transparency'] ?></label>
									<div id="slider"></div>
								</div>
							</div>
							<div class="btn__box">
								<button id="reset" type="reset" class="btn btn__clear" disabled="disabled"><?php echo $text["reset"] ?></button>
								<button id="submit" type="submit" class="btn btn__save" disabled="disabled"><?php echo $text["download"] ?></button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer">
			<div class="container footer-wrap">
				<div class="footer-copi">© 2015. <?php echo $text["copyright"] ?></div>
			</div>
		</footer>
	</body>
	<!-- bower:js -->
	<script src="bower/jquery/jquery.js"></script>
	<script src="bower/jquery-ui/jquery-ui.js"></script>
	<!-- endbower -->
	<script src="js/vendor/jquery.ui.widget.js"></script>
	<script src="js/jquery.iframe-transport.js"></script>
	<script src="js/jquery.fileupload.js"></script>
	<script src="js/jquery.fadeloader.js"></script>
	<script src="js/main2.js"></script>
	<script src="js/share.js"></script>
</html>