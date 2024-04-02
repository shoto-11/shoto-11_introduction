//スクロールすると上部に固定させるための設定を関数でまとめる
function FixedAnime() {
	var headerH = $(".header").outerHeight(true);
	var scroll = $(window).scrollTop();
	if (scroll >= headerH) {
		//headerの高さ以上になったら
		$(".header").addClass("fixed"); //fixedというクラス名を付与
	} else {
		//それ以外は
		$(".header").removeClass("fixed"); //fixedというクラス名を除去
	}
}

//ナビゲーションをクリックした際のスムーススクロール
$(".headerNavLists_item>a").click(function () {
	var elmHash = $(this).attr("href"); //hrefの内容を取得
	var pos = Math.round($(elmHash).offset().top - 120); //headerの高さを引く
	$("body,html").animate({ scrollTop: pos }, 500); //取得した位置にスクロール※数値が大きいほどゆっくりスクロール
	return false; //リンクの無効化
});

//スライダー文字
$(function () {
	$(".slider").slick({
		autoplay: true, //自動でスライドさせる
		autoplaySpeed: 0, //次の画像に切り替えるまでの時間 今回の場合は0
		speed: 40000, //画像が切り替わるまでの時間 今回の場合は難病で1枚分動くか
		cssEase: "linear", //動きの種類は等速に
		arrows: false, //左右に出る矢印を非表示
		swipe: false, //スワイプ禁止
		pauseOnFocus: false, //フォーカスが合っても止めない
		pauseOnHover: false, //hoverしても止めない
		variableWidth: true, //スライドの要素の幅をcssで設定できるようにする
	});
});

//worksの横スライド
$.prototype.draggable = function () {
	var t;
	$(this).each(function (i, e) {
		$(e).mousedown(function (e2) {
			e2.preventDefault();
			t = $(e);
			$(e).data({
				down: true,
				x: e2.clientX,
				y: e2.clientY,
				left: $(e).scrollLeft(),
				top: $(e).scrollTop(),
			});
		});
	});
	$(document)
		.mousemove(function (e) {
			if ($(t).data("down")) {
				e.preventDefault();
				$(t).scrollLeft($(t).data("x") + $(t).data("left") - e.clientX);
				$(t).scrollTop($(t).data("y") + $(t).data("top") - e.clientY);
			}
		})
		.mouseup(function (e) {
			$(t).data("down", false);
		});
};
$(".works_list").draggable();

//website 左からスライド
$(function () {
	//フェードインさせたい要素の位置をずらす
	$(".isPlay_l").css({
		opacity: "0",
		transform: "translateX(-100px)",
	});
	$(".isPlay_r").css({
		opacity: "0",
		transform: "translateX(100px)",
	});
	//画面をスクロールするとイベントが発動する
	$(window).scroll(function () {
		//スクロールバーの位置を取得
		var scroll = $(window).scrollTop();

		//ウィンドウの高さを取得
		var windowHeight = $(window).height();

		$(".isPlay_l,.isPlay_r ").each(function () {
			//フェードインさせたい要素の縦位置を取得
			var elemPos = $(this).offset().top;

			//要素がウィンドウの中に入ってからさらに100pxスクロールしたら要素をフェードインする
			if (scroll > elemPos - windowHeight + 200) {
				$(this).css({
					opacity: "1",
					transform: "translateX(0)",
				});
			}
		});
		$(".fadeInUp ").each(function () {
			//フェードインさせたい要素の縦位置を取得
			var elemPos = $(this).offset().top;
			
			//要素がウィンドウの中に入ってからさらに0pxスクロールしたら要素をフェードインする
			if (scroll > elemPos - windowHeight + 0) {
				$(this).addClass("fadeIn");
			}
		});
	});
});
