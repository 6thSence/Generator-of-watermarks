<?php

?>

<!DOCTYPE html><!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<html lang="ru-RU">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta charset="UTF-8">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title>Генератор водяных знаков</title>
		<!-- ***** seo ******-->
		<meta name="description" content="Генерация водяных знаков">
		<meta name="keywords" content="">
		<meta name="author" content="">
		<!-- ***** favicon ******-->
		<!-- ***** css ******-->
		<link rel="stylesheet" href="./main.css">
		<!-- ***** js ******-->
	</head>
	<body>
		<div class="wrapper-all">
			<div class="wrapper">
				<div class="container cl">
					<div class="main-bl">
						<div style="opacity: 1;" class="main-title">Генератор водяных знаков</div>
						<div data-bg="watermark-work-rus" class="watermark-work">
							<div class="aim-img"></div>
						</div>
					</div>
					<div class="controls-bl">
						<div class="controls-title">Настройки
							<form class="form">
								<input type="hidden" name="aim-img">
								<input type="hidden" name="watermark">
								<input type="hidden" name="opacity" value="1">
								<input type="hidden" name="mode">
								<div class="form__group">
									<label class="form__label original-image">Исходное изображение</label>
									<div class="form__input input-group">
										<input id="image" placeholder="image.jpg" disabled="disabled" class="input-group__input">
										<div class="input-group__icon">
											<input type="file" data-file-name-input="#image" class="input-group__file-load">
										</div>
									</div>
								</div>
								<div class="form__group">
									<label class="form__label watermark-image">Водяной знак</label>
									<div class="form__input input-group">
										<input id="watermark" placeholder="image.png" disabled="disabled" class="input-group__input">
										<div class="input-group__icon">
											<input type="file" data-file-name-input="#watermark" class="input-group__file-load">
										</div>
									</div>
								</div>
								<div class="separator"></div>
								<div class="form__group">
									<div class="placement">
										<label class="form__label place-title">Положение</label>
									</div>
									<div id="chooseSingle" class="position-select position-select_single active">
										<div class="position-select__choose choose-position">
											<div id="top-left" class="choose-position__item choose-position__item_single active"></div>
											<div id="top-center" class="choose-position__item choose-position__item_single"></div>
											<div id="top-right" class="choose-position__item choose-position__item_single"></div>
											<div id="middle-left" class="choose-position__item choose-position__item_single"></div>
											<div id="middle-center" class="choose-position__item choose-position__item_single"></div>
											<div id="middle-right" class="choose-position__item choose-position__item_single"></div>
											<div id="bottom-left" class="choose-position__item choose-position__item_single"></div>
											<div id="bottom-center" class="choose-position__item choose-position__item_single"></div>
											<div id="bottom-right" class="choose-position__item choose-position__item_single"></div>
										</div>
										<div class="position-select__count count-position">
											<div class="input-group_count">
												<label for="moveX" class="input-group__label_count">X</label><span>
													<input id="moveX" name="value_x" value="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item count-position__item_x"><a tabindex="-1" role="button"><span><span></span></span></a><a tabindex="-1" role="button"><span><span></span></span></a></span>
											</div>
											<div class="input-group_count">
												<label for="moveY" class="input-group__label_count">Y</label><span>
													<input id="moveY" name="value_y" value="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item count-position__item_y"><a tabindex="-1" role="button"><span><span></span></span></a><a tabindex="-1" role="button"><span><span></span></span></a></span>
											</div>
										</div>
									</div>
									<div id="chooseMulti" class="position-select position-select_multi">
										<div class="position-select__choose choose-position">
											<div class="choose-position__margin choose-position__margin_right"></div>
											<div class="choose-position__margin choose-position__margin_bottom"></div>
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
										<div class="position-select__count count-position">
											<div class="input-group_count">
												<label for="margin-right" class="input-group__label_count">X</label><span class="ui-spinner ui-widget ui-widget-content ui-corner-all">
													<input id="margin-right" name="value_right" value="0" aria-valuemin="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item count-position__item_x ui-spinner-input"><a tabindex="-1" role="button"><span><span></span></span></a><a tabindex="-1" role="button"><span><span></span></span></a></span>
											</div>
											<div class="input-group_count">
												<label for="margin-bottom" class="input-group__label_count">Y</label><span>
													<input id="margin-bottom" name="value_bottom" value="0" aria-valuemin="0" aria-valuenow="0" autocomplete="off" role="spinbutton" class="count-position__item count-position__item_y"><a tabindex="-1" role="button"><span class="ui-button-text"><span class="ui-icon ui-icon-triangle-1-n">▲</span></span></a><a tabindex="-1" role="button" class="ui-spinner-button ui-spinner-down ui-corner-br ui-button ui-widget ui-state-default ui-button-text-only"><span class="ui-button-text"><span class="ui-icon ui-icon-triangle-1-s">▼</span></span></a></span>
											</div>
										</div>
									</div>
								</div>
								<div class="separator"></div>
								<div class="form__group">
									<label class="input-group__label transparency-title">Прозрачность</label>
								</div>
								<div class="separator"></div>
								<div class="btn__box">
									<button type="reset" class="btn btn__clear">Сброс</button>
									<button type="submit" class="btn btn__save">Скачать</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer">
			<div class="footer-wrap">
				<div class="footer-copi">© 2015, Это мой сайт, пожалуйста, не копируйте и не воруйте его</div>
			</div>
		</footer>
	</body><!-- bower:js -->
<script src="../../bower/jquery/jquery.js"></script>
<script src="../../bower/jquery-ui/jquery-ui.js"></script>
<!-- endbower -->
	<script src="js/main.js"></script>
</html>