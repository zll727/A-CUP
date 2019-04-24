 $(function(){
    $('.content').css('height',$('.right').height());
    $('.left ul li').eq(0).addClass('active');
    $(window).scroll(function(){
      if($(window).scrollTop() >= 150){
        $('.swiper-container-ul').css('position','fixed');
        $('.left').css('position','fixed');
        $('.right').css('margin-left',$('.left').width());
      }else {
        $('.swiper-container-ul').css('position','');
        $('.left').css('position','');
        $('.right').css('margin-left','');
      };
      //滚动到标杆位置,左侧导航加active
      $('.right ul li').each(function(){
        var target = parseInt($(this).offset().top-$(window).scrollTop()-150);
        var i = $(this).index();
        if (target<=0) {
          $('.left ul li').removeClass('active');
          $('.left ul li').eq(i).addClass('active');
        }
      });
    });
    $('.left ul li').click(function(){
      var i = $(this).index('.left ul li');
      $('body, html').animate({scrollTop:$('.right ul li').eq(i).offset().top-40},500);
    });
    $('.swiper-container-ul-li').click(function(){
      var index = $(this).index();
      if(index == 0){
        $('.swiper-slide').eq(0).show();
        $('.swiper-container-ul-li').eq(0).addClass('actives');
        $('.swiper-slide').eq(1).hide();
        $('.swiper-container-ul-li').eq(1).removeClass('actives');
      }else {
        $('.swiper-slide').eq(0).hide();
        $('.swiper-container-ul-li').eq(0).removeClass('actives');
        $('.swiper-slide').eq(1).show();
        $('.swiper-container-ul-li').eq(1).addClass('actives');
      }
    });
  });