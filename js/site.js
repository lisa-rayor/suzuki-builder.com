$(function () {
  $('.btn-trigger').on('click', function () {
    $(this).toggleClass('active');
    $('.sp_menu').slideToggle(500);
    return false;
  });

  $.each(
    {
      home: 'トップ',
      company: '会社概要',
      service: '事業内容',
      works: '施工事例',
      products: '商品一覧',
      contact: 'お問い合わせ'
    },
    function (name, label) {
      $('header > .wrap > ul .' + name + ' a').hover(
        function () {
          $(this).text(label);
        },
        function () {
          $(this).text(name.toUpperCase());
        }
      );
    }
  );
});
