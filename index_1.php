<?php
session_start();
include_once 'php/config.php';
include_once 'php/functions.php';
include_once 'php/lang.php';
require_once 'server/php/UploadHandler.php';

error_reporting(E_ALL | E_STRICT);
$upload_handler = new UploadHandler();

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

<html lang="ru-RU">
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="Сервис для генерации водяных знаков">
		<title><?php echo $text['title'] ?></title>
	</head>
	<body>
		<!-- Заголовок -->
		<div><?php echo $text['title'] ?></div>

		<!-- Настройки -->
		<div class="controls-title"><?php echo $text['settings'] ?>

			<form class="form" method="post" action="php/download.php" enctype="multipart/form-data">

				<!-- Исходное изображение -->
				<div class="form__group">
					<label class="form__label original-image">
						<?php echo $text['image'] ?>
						<input name="original-image" type="file">
					</label>
				</div>

				<!-- Водяной знак -->
				<div class="form__group">
					<label class="form__label watermark-image">
						<?php echo $text['watermark'] ?>
						<input name="watermark-image" type="file">
					</label>
				</div>

				<!-- Позиция -->
				<div class="form__group">
					<div class="placement">
						<label class="form__label place-title"><?php echo $text['position'] ?></label>
						<input name="origin-x" type="text" placeholder="<?php echo $text['origin-x'] ?>">
						<input name="origin-y" type="text" placeholder="<?php echo $text['origin-y'] ?>">
					</div>
				</div>

				<!-- Прозрачность -->
				<div class="form__group">
					<label class="input-group__label transparency-title"><?php echo $text['transparency'] ?></label>
					<input name="transparency" type="text" placeholder="<?php echo $text['transparency'] ?>">
				</div>

				<!-- Замощение: да/нет -->
				<div class="form__group">
					<input type="radio" name="is-pattern" value="true"> Pattern
					<input type="radio" name="is-pattern" value="false"> Non pattern
				</div>

				<!-- Сабмит/Ресет -->
				<div class="btn__box">
					<button type="reset" class="btn btn__clear" disabled="disabled"><?php echo $text["reset"] ?></button>
					<button type="submit" class="btn btn__save" disabled="disabled"><?php echo $text["download"] ?></button>
				</div>

			</form>

		</div>

		<!-- Смена языка -->
		<a href="ru">RU</a>
		<a href="en">EN</a>

		<!-- Лайк -->
		<a id="vk-share" href="">VK</a>
		<a id="fb-share" href="">FB</a>
		<a id="tw-share" href="">TW</a>

		<!-- Футер -->
		<footer class="footer">
			<div class="footer-wrap">
				<div class="footer-copi">© 2015, <?php echo $text["copyright"] ?></div>
			</div>
		</footer>

		<script src="bower/jquery/jquery.min.js"></script>
		<script src="js/share.js"></script>
	</body>

</html>