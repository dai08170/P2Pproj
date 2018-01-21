		var path="";
		var mobile_code="";
		var check="";
		var InterValObj;
		var count=60;
		var curcount;
		function getPhoneCode(){
			curcount=count;
			var phone = $('#phone').val();

			if(phone==""){
                swal("手机号码不能为空！","","error");
                return;
			}
			if(phone.length != 11){
                swal("请输入11位的手机号码！","","error");
                return;
			}

			if(phone != ""){
				$('#vcode').attr("disabled",true);
				$('#vcode').val(curcount+"秒后重发验证码");
				InterValObj = setInterval(setRemainTime, 1000);
				InterValObj = setInterval(setRemainTime, 1000);
				// alert(InterValObj);
				checkPhoneIsExist();
			}
		}	
		
		 function setRemainTime() {  
		
			    if (curcount == 0) {  
			        clearInterval(InterValObj);//停止计时器  
			        $("#vcode").removeAttr("disabled");//启用按钮  
			        $("#vcode").val("重新发送验证码");   
			        code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效      
			    }  
			    else {  
			    	  curcount--;  
			    	  $("#vcode").val(curcount + "秒后可重发验证码");  
			    }  
			}  
		
		function checkPhoneIsExist(){
			var phone = $('#phone').val();

            $.post(path + '/luser/gainCode',
                $('#loginForm').serialize(),
                function (data) {

                    mobile_code=data;

                },"json"
            );

	       }
		
		
		 function checkyzm(){
			 var yzm =  $('#code').val();
			 if($('#code').val().length==0){
                    swal("验证码不能为空","","error");
					return;
			 }else if(yzm!=mobile_code){

                    swal("验证码错误","","error");

					return;
			 }
			
		 }



        function checkPhone() {

            $.post(path + '/luser/forgetPassword',
                $('#loginForm').serialize(),
                function (data) {
                    if (data.result === 'ok') {

                    } else {
                        swal(data.message,"","error");

                        if(data.message!=null){
                        	check=data.message;
						}
                    }
                },
                'json'
            );
        }



        function login() {
            var phone = $('#phone').val();

            var yzm =  $('#code').val();
            if(yzm!=mobile_code){
                swal("验证码错误","","error");

                return;
            }

            $.post(path + '/luser/forgetPassword',
                $('#loginForm').serialize(),
                function (data) {
                    if (data.result === 'ok' || data.result==='logined') {
                        window.location.href = path + "/luser/resettingPwd/"+phone;
                    } else {
                        swal(data.message,"","error");
                    }
                },
                'json'
            );
        }


