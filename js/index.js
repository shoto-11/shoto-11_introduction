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
