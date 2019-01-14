require(['./js/main.js'],function(){
    require(['bscroll','jquery'],function(bscroll,$){
          var id='',
              title='',
              con='';


        var scroll=new bscroll('section',{
            probeType:2,
            click:true
        })

        init();
         function init(){
            $('.aside').hide();
              loadData();
              addEvent();
         }
        
         function loadData(){
            $.ajax({
                url:'/api/getList',
                dataType:'json',
                success:function(res){
                    if(res.code===1){
                       renderList(res.msg)
                    }
                }
            })
         }

         function renderList(data){
              var str='';
              data.forEach(function(file){
                  str+=`
                  <div>
                  <h2>${file.title}</h2>
                  <p>${file.con}</p>
                  <span class="change" data-id="${file._id}" data-con="${file.con}" data-title="${file.title}">修改</span><span class="del" data-id="${file._id}">删除</span>
              </div>`
              })
            $('.list').html(str);
         }

         function addEvent(){
              $('.list').on('click','.del',function(){
                  var that=$(this);
                    var id=$(this).attr('data-id');
                    if(id){
                        $.ajax({
                            url:'/api/delList',
                            data:{
                                id:id
                            },
                            dataType:'json',
                            success:function(res){
                               if(res.code===1){
                                   alert(res.msg);
                                    that.parent().remove();
                               }
                            }
                        })
                    }
              })
              
              $('footer').on('click',function(){
                      $('.aside').show();
              })
              $('.list').on('click','.change',function(){
                    id=$(this).attr('data-id');
                    title=$(this).attr('data-title');
                    con=$(this).attr('data-con');
                    $('.aside').show();
                     $('.ipt').val(title);
                     $('.con').val(con);
              })

              $('.cons').on('click','span',function(){
                     if($(this).html()==='确定'){
                               title= $('.ipt').val();
                               con= $('.con').val();
                           var url=id?'/api/cList':'/api/addList';
                               $.ajax({
                                   url:url,
                                   type:'post',
                                   data:{
                                       title:title,
                                       con:con,
                                       id:id
                                   },
                                   dataType:'json',
                                   success:function(res){
                                       console.log(res)
                                      if(res.code===1){
                                          alert(res.msg);
                                          $('.aside').hide();
                                          loadData();
                                          id='';
                                      }
                                   }
                               })


                     }else{
                        $('.aside').hide();
                     }
                     $('.aside').hide();
                     $('.ipt').val('');
                     $('.con').val('');
              })
             




         }


    })
})