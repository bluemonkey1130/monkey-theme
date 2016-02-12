/**
 * Created by georgehawthorne on 04/02/2016.
 */
$(document).ready(function(){
    jQuery('.slider_1').slick({
        slidesToShow:5,
        slidesToScroll: 1,
        infinite: true,
        centerMode:true,
        asNavFor: '.slider_2',
        focusOnSelect: true,
        centerPadding: '2%',
        prevArrow:"<img class='a-left control-c prev slick-prev' src='"+templateUrl+"/library/images/img/left_chev.png'>",
        nextArrow:"<img class='a-right control-c next slick-next' src='"+templateUrl+"/library/images/img/right_chev.png''>",
        responsive: [

            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerPadding: '2%'

                }
            },

            { breakpoint: 500,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },

        ]
    })
});