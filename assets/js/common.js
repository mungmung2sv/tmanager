document.addEventListener('DOMContentLoaded', function() {
	const navLinks = document.querySelectorAll('#nav > ul > li > a');

	navLinks.forEach(function(link) {
		link.addEventListener('click', function(event) {
			const parentLi = this.parentElement;
			const siblingUl = this.nextElementSibling;

			document.querySelectorAll('#nav > ul > li').forEach(function(li) {
				if (li !== parentLi) {
					li.classList.remove('open');
				}
			});
			if (siblingUl) {
				event.preventDefault();
				parentLi.classList.toggle('open');
			} else {
				parentLi.classList.add('open');
			}
		});
	});
});

//datepicker 호출 yyyy mm dd
document.addEventListener("DOMContentLoaded", function () {
	var datepickerIcons = document.getElementsByClassName('datepicker-icon');
	for (var i = 0; i < datepickerIcons.length; i++) {
	  new Litepicker({
		lang: 'ko-KR',
		format: 'YYYY-MM-DD',
		element: datepickerIcons[i],
		buttonText: {
		  previousMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`,
		  nextMonth: `<!-- Download SVG icon from http://tabler-icons.io/i/chevron-right -->
			<svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`,
		},
		dropdowns: {
		  minYear: 1980, // Minimum selectable year
		  maxYear: 2030, // Maximum selectable year
		  months: true, // Enable month select box
		  years: true, // Enable year select box
		},
	  });
	}
  });
  
  
  // 바이트 계산
  document.addEventListener('DOMContentLoaded', function () {
	  const maxInitial = 90;
	  const maxExtended = 2000;
	  const maxByteElements = document.querySelectorAll('.max-byte');
	  function updateByteLength(element) {
		  let textValue = element.value;
		  let byteCount = getByteLength(textValue);
  
		  let maxByteDisplay = element.closest('.input-group').querySelector('.max-len strong');
		  let lenDisplay = element.closest('.input-group').querySelector('.max-len b');
		  if (byteCount > maxInitial) {
			  maxByteDisplay.textContent = maxExtended;
		  } else {
			  maxByteDisplay.textContent = maxInitial;
		  }
		  if (byteCount > maxExtended) {
			  element.value = truncateToByteLength(textValue, maxExtended);
			  byteCount = getByteLength(element.value);
		  }
		  lenDisplay.textContent = byteCount;
	  }
	  maxByteElements.forEach(function (element) {
		  updateByteLength(element);
	  });
	  document.addEventListener('input', function (event) {
		  if (event.target.matches('.max-byte')) {
			  updateByteLength(event.target);
		  }
	  });
  });
  function getByteLength(str) {
	  let byteLength = 0;
	  for (let i = 0; i < str.length; i++) {
		  byteLength += (str.charCodeAt(i) > 127) ? 2 : 1;
	  }
	  return byteLength;
  }
  function truncateToByteLength(str, maxLength) {
	  let byteLength = 0;
	  let truncatedStr = '';
	  for (let i = 0; i < str.length; i++) {
		  let charByteLength = (str.charCodeAt(i) > 127) ? 2 : 1;
		  if (byteLength + charByteLength > maxLength) {
			  break;
		  }
		  truncatedStr += str[i];
		  byteLength += charByteLength;
	  }
	  return truncatedStr;
  }
  
  //input 최대값 계산
  document.addEventListener('input', function (event) {
	if (event.target.matches('.max-text')) {
	  let tsVal = event.target.value;
	  let numChar = tsVal.length;
	  const maxNum = event.target.getAttribute('maxlength');
	  let lenDisplay = event.target.closest('.input-group').querySelector('.max-len b');
	  if (numChar > maxNum) {
		event.target.value = tsVal.substr(0, maxNum);
		lenDisplay.textContent = numChar;
	  } else {
		lenDisplay.textContent = numChar;
	  }
	}
  });
  
  
  document.addEventListener("DOMContentLoaded", function () {
  
	//input 최대값 계산 - 페이지 로드 시 최대값 계산해서 출력
	const maxLenSpans = document.querySelectorAll('.max-len');
	maxLenSpans.forEach(function (maxLenSpan) {
		const inputGroup = maxLenSpan.closest('.input-group');
		const maxText = inputGroup.querySelector('.max-text');
		
		if (maxText) {
			let numChar = maxText.value.length;
			maxLenSpan.querySelector('b').textContent = numChar;
		}
	});
  
  
	//input tel 숫자만 입력
	function allowOnlyNumbersForTelInputs() {
	  const telInputs = document.querySelectorAll('input[type="tel"]');
	  telInputs.forEach(function (telInput) {
		telInput.addEventListener('input', function () {
		  this.value = this.value.replace(/[^0-9]/g, '');
		});
	  });
	}
	allowOnlyNumbersForTelInputs();
  
	//input 가격 콤마처리
	function formatAmountWithComma(value) {
	  value = value.replace(/[^0-9]/g, '');
	  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	  return value;
	}
  
	function numberFotmatComma() {
		const telInputs = document.querySelectorAll('input[data-amount-comma]');
		telInputs.forEach(function (telInput) {
			telInput.value = formatAmountWithComma(telInput.value);
  
			telInput.addEventListener('input', function () {
				this.value = formatAmountWithComma(this.value);
			});
		});
	}
	numberFotmatComma();
  
	//input 특수문자 입력불가
	function restrictSpecialCharacters() {
	  const inputs = document.querySelectorAll('input[data-input-texts]');
	  const specialCharsRegex = /[^\w\sㄱ-ㅎㅏ-ㅣ가-힣]/g; // 특수 문자 제외 정규 표현식
  
	  inputs.forEach(function(input) {
		  input.addEventListener('input', function() {
			  this.value = this.value.replace(specialCharsRegex, '');
		  });
	  });
  }
	restrictSpecialCharacters();
  });
  
  //체크박스 전체 체크 
  document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.label_control input[type="checkbox"]').forEach(function (check) {
	  check.addEventListener('change', function (event) {
		const target = event.target;
		const labelControlParent = check.closest('.label_control-parent');
		const checkAllParentCheckbox = labelControlParent ? labelControlParent.querySelector('.check_all-parent') : null;
		if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
		  const isChecked = target.checked;
		  const checkboxes = check.closest('.label_control').querySelectorAll('input[type="checkbox"]');
		  checkboxes.forEach(function (checkbox) {
			checkbox.checked = isChecked;
		  });
		  if (!isChecked) {
			target.checked = false; // check_all 비활성화
			if (checkAllParentCheckbox) {
			  checkAllParentCheckbox.checked = false; // check_all 비활성화
			}
		  }
		} else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
		  const checkAllCheckbox = check.closest('.label_control').querySelector('.check_all');
		  if (checkAllCheckbox) {
			checkAllCheckbox.checked = false; // check_all 비활성화
		  }
		  if (checkAllParentCheckbox) {
			checkAllParentCheckbox.checked = false; // check_all 비활성화
		  }
		}
	  });
	});
  });
  /*
  document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll('.label_control').forEach(function (labelControl) {
	  labelControl.addEventListener('change', function (event) {
		const target = event.target;
		if (target.matches('input[type="checkbox"]') && target.classList.contains('check_all')) {
		  const isChecked = target.checked;
		  const checkboxes = labelControl.querySelectorAll('input[type="checkbox"]');
		  checkboxes.forEach(function (checkbox) {
			checkbox.checked = isChecked;
		  });
		  if (!isChecked) {
			target.checked = false; // check_all 비활성화
		  }
		} else if (target.matches('input[type="checkbox"]:not(.check_all)') && !target.checked) {
		  const checkAllCheckbox = labelControl.querySelector('.check_all');
		  if (checkAllCheckbox) {
			checkAllCheckbox.checked = false; // check_all 비활성화
		  }
		}
	  });
	});
  });*/
  
  //공통 쿠키 셋 겟
  function setCookie(name, value, days) {
	var expires = '';
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }
  function getCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
  }
 
  //로딩바 생성
  document.addEventListener("DOMContentLoaded", function() {
	var loadingDiv = document.createElement("div");
	loadingDiv.classList.add("loading");
	document.body.appendChild(loadingDiv);
	var loadingInnerDiv = document.createElement("div");
	loadingInnerDiv.classList.add("loading_inner");
	loadingDiv.appendChild(loadingInnerDiv);
  })
  function loading(action) {
	const loadingDiv = document.querySelector('.loading');
	if (action === 'show') {
	  loadingDiv.classList.add('active');
	} else if (action === 'hide') {
	  loadingDiv.classList.remove('active');
	}
  }
  
  // 라디오 변경에 따른 display
  function handleRadioChange() {
	var groupName = this.getAttribute("name");
	var sameRadios = document.querySelectorAll('input[name="'+ groupName +'"]');
	sameRadios.forEach(function(target) {
		var displayTargets = target.getAttribute("radio-display").split(" ");
		displayTargets.forEach(function(target) {
			var elements = document.getElementsByClassName(target);
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = "none";
			}
		});
		if(target.getAttribute("radio-display-hide")){
		  var displayHideTargets = target.getAttribute("radio-display-hide").split(" ");
		  displayHideTargets.forEach(function(target) {
			  var elements = document.getElementsByClassName(target);
			  for (var i = 0; i < elements.length; i++) {
				  elements[i].style.display = "none";
			  }
		  });
		}
	});
	var selectedTargets = this.getAttribute("radio-display").split(" ");
	selectedTargets.forEach(function(target) {
		var selectedElements = document.getElementsByClassName(target);
		for (var i = 0; i < selectedElements.length; i++) {
			selectedElements[i].style.display = "";
		}
	});
  }
  
  // 검색 셀렉트 박스 변경에 따른 display
  function handleSearchSelectChange() {
	var options = this.querySelectorAll('.item a');
  
	// 모든 대상 요소 숨기기
	options.forEach(function(target) {
		var displayTargets = target.getAttribute("select-display").split(" ");
		displayTargets.forEach(function(targetClass) {
			var elements = document.getElementsByClassName(targetClass);
			for (var i = 0; i < elements.length; i++) {
				elements[i].style.display = "none";
			}
		});
		if(target.getAttribute("select-display-hide")){
		  var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
		  displayHideTargets.forEach(function(target) {
			var elements = document.getElementsByClassName(target);
			for (var i = 0; i < elements.length; i++) {
			  elements[i].style.display = "none";
			}
		  });
		}
	});
  
	// active 클래스를 가진 옵션의 인덱스를 찾기
	let activeIndex = -1;
	for (let i = 0; i < options.length; i++) {
		if (options[i].classList.contains('active')) {
			activeIndex = i;
			break;
		}
	}
  
	// active 클래스를 가진 옵션이 있으면 해당 옵션의 display 설정
	if (activeIndex !== -1) {
		var selectedOption = options[activeIndex];
		var selectedTargets = selectedOption.getAttribute("select-display");
		if (selectedTargets) {
			var targetsArray = selectedTargets.split(" ");
			targetsArray.forEach(function(targetClass) {
				var selectedElements = document.getElementsByClassName(targetClass);
				for (var i = 0; i < selectedElements.length; i++) {
					selectedElements[i].style.display = "";
				}
			});
		}
	}
  }
  
  // 셀렉트박스 변경에 따른 display
  function handleSelectChange() {
	var options = this.querySelectorAll('option');
  
	options.forEach(function(target) {
	  var displayTargets = target.getAttribute("select-display").split(" ");
	  displayTargets.forEach(function(target) {
		  var elements = document.getElementsByClassName(target);
		  for (var i = 0; i < elements.length; i++) {
			  elements[i].style.display = "none";
		  }
	  });
	  if(target.getAttribute("select-display-hide")){
		  var displayHideTargets = target.getAttribute("select-display-hide").split(" ");
		  displayHideTargets.forEach(function(target) {
			var elements = document.getElementsByClassName(target);
			for (var i = 0; i < elements.length; i++) {
			  elements[i].style.display = "none";
			}
		  });
		}
	});
  
	var selectedOption = this.options[this.selectedIndex];
	var selectedTargets = selectedOption.getAttribute("select-display");
	if (selectedTargets) {
		var targetsArray = selectedTargets.split(" ");
		targetsArray.forEach(function(target) {
			var selectedElements = document.getElementsByClassName(target);
			for (var i = 0; i < selectedElements.length; i++) {
				selectedElements[i].style.display = "";
			}
		});
	}
  }
  
  document.addEventListener("DOMContentLoaded", function() {
	
	// 라디오 버튼 변경 이벤트 리스너 등록
	var radios = document.querySelectorAll('input[radio-display]');
	radios.forEach(function(radio) {
		radio.addEventListener("change", handleRadioChange);
		// 페이지 로드 시 라디오 버튼의 상태에 따라 초기 화면 설정
		if (radio.checked) {
			handleRadioChange.call(radio); // 선택된 라디오 버튼에 대한 처리 실행
		}
	});
  
  
	// 셀렉트 디스플레이 변경 이벤트 리스너 등록
	var selects = document.querySelectorAll('select.select-display');
	selects.forEach(function(select) {
		select.addEventListener("change", handleSelectChange);
		// 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
		if (checkVisibility(select)) {
		  if (select.selectedIndex > 0) {
			handleSelectChange.call(select);
		  }
		}
	});
  
	
	// 검색셀렉트 디스플레이 변경 이벤트 리스너 등록
	var searchSelects = document.querySelectorAll('.search_select.select-display');
	searchSelects.forEach(function(select) {
	  select.addEventListener("click", handleSearchSelectChange);
		// 페이지 로드 시 select 요소의 상태에 따라 초기 화면 설정
		if (checkVisibility(select)) {
		handleSearchSelectChange.call(select);
	  }
	});
  });
  
  // 가시성 체크 함수
  function checkVisibility(element) {
	while (element) {
	  if (element === document.body) {
		break;
	  }
	  const style = window.getComputedStyle(element);
	  if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
		return false;
	  }
	  element = element.parentElement;
	}
	const rect = element.getBoundingClientRect();
	return rect.width > 0 && rect.height > 0;
  }
  
  //라디오, 셀렉트 디스플레이 초기화 셋
  function radioSelectdisplaySet(){
	var selects = document.querySelectorAll('select.select-display');
	  selects.forEach(function(select) {
		  if (checkVisibility(select)) {
			if (select.selectedIndex > 0) {
			  handleSelectChange.call(select);
			}
		  }
	  });
	
	var searchSelects = document.querySelectorAll('.search_select.select-display');
	searchSelects.forEach(function(select) {
	  if (checkVisibility(select)) {
		handleSearchSelectChange.call(select);
	  }
	});
	
	var radios = document.querySelectorAll('input[radio-display]');
	radios.forEach(function(radio) {
	  if (checkVisibility(radio)) {
		if (radio.checked) {
			handleRadioChange.call(radio);
		  }
		}
	});
  }
  
  /*날짜선택*/
  /* 날짜 객체 받아서 문자열로 리턴하는 함수 */
  function getDateStr(myDate){
	  return (myDate.getFullYear() + '-' + ("0" + (myDate.getMonth() + 1)).slice(-2) + '-' + ("0" + myDate.getDate()).slice(-2))
  }
  function getDateStr2(myDate){
	  return (myDate.getFullYear() + '-' + ("0" + (myDate.getMonth())).slice(-2))
  }
  /* 오늘 날짜를 문자열로 반환 */
  function today() {
	var d = new Date();
	return getDateStr(d)
  }
  /* 어제*/
  function yesterday() {
	var d = new Date()
	var dayOfMonth = d.getDate()
	d.setDate(dayOfMonth - 1)
	return getDateStr(d)
  }
  function month() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	  if(month < 10){ 
		  month = '0'+ month;
	  }
	return year + '-' + month;
  }
  /* 일주일전 */
  function lastWeek() {
	var d = new Date()
	var dayOfMonth = d.getDate()
	d.setDate(dayOfMonth - 7)
	return getDateStr(d)
  }
  /* 15일 전*/
  function halfMonth() {
	var d = new Date()
	var dayOfMonth = d.getDate()
	d.setDate(dayOfMonth - 15)
	return getDateStr(d)
  }
  /* 당월*/
  function nowMonth() {
	var d = new Date()
	var dayOfMonth = d.getDate();
	var day = ('0' + d.getDate()).slice(-2);
	d.setDate(dayOfMonth - day + 1)
	return getDateStr(d)
  }
  /* 전월*/
  function prevMonth() {
	  var date = new Date();
	  //현재 시간 기준으로 1일을 구한 후
	  var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
	  //현재 시간 기준 1일을 구한 후 하루를 빼주면 전월 말일 이됨
	  var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
	  //월은 0 - 11까지 이므로 1이적게 나와서 1을 더해준다
	  check_month = lastMonth.getMonth()+1;
	  if(check_month < 10){
	  check_month = "0"+check_month;
	  }
	  sDate = lastMonth.getFullYear()+"-"+check_month+"-01";
	  date.setDate(sDate)
	return (sDate)
  }
  function prevMonthLast() {
	  var date = new Date();
	  //현재 시간 기준으로 1일을 구한 후
	  var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
	  //현재 시간 기준 1일을 구한 후 하루를 빼주면 전월 말일 이됨
	  var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
	  //월은 0 - 11까지 이므로 1이적게 나와서 1을 더해준다
	  check_month = lastMonth.getMonth()+1;
	  if(check_month < 10){
	  check_month = "0"+check_month;
	  }
	  eDate = lastMonth.getFullYear() + "-" + check_month+ "-" + lastMonth.getDate();
	  date.setDate(eDate)
	return (eDate)
  }
  /* 오늘로부터 1개월전 날짜 반환 */
  function selMonth(selDate) {
	var d = new Date()
	var monthOfYear = d.getMonth()
	d.setMonth(monthOfYear - selDate)
	return getDateStr(d)
  }
  /* 오늘로부터 선택월 이전 날짜 반환 
  function prevMonth(selDate) {
	var d = new Date()
	var monthOfYear = d.getMonth()
	d.setMonth(monthOfYear - selDate)
  
	return getDateStr2(d)
  }*/
  $(document).ready(function() {
	$('.date_sel.date_sel1 button').click(function(){//과거-현재
	  var selDate = $(this).attr('data-rel');
	  if(selDate == 0){
		$(this).closest('.date_cwrap').find('.dc_start').val(today());
	  }else if(selDate == "1d"){
		$(this).closest('.date_cwrap').find('.dc_start').val(yesterday());
	  }else if(selDate == "7d"){
		$(this).closest('.date_cwrap').find('.dc_start').val(lastWeek());
	  }else if(selDate == "15d"){
		$(this).closest('.date_cwrap').find('.dc_start').val(halfMonth());
	  }else if(selDate == "nm"){
		$(this).closest('.date_cwrap').find('.dc_start').val(nowMonth());
	  }else if(selDate == "pm"){
		$(this).closest('.date_cwrap').find('.dc_start').val(prevMonth());
		$(this).closest('.date_cwrap').find('.dc_end').val(prevMonthLast());
		return false
	  }else{
		$(this).closest('.date_cwrap').find('.dc_start').val(selMonth(selDate));
	  }
	  $(this).closest('.date_cwrap').find('.dc_end').val(today());
	});
  
	  if($('div').hasClass('date_cwrap')){
		  $(this).find('.dc_start').val(today());
		  $(this).find('.dc_end').val(today());
	  }
  });
  
  //글자 복사금지
  /*
  function preventRclick(){ 
	$('body').on("contextmenu", function(e){ 
	  return false; 
	}); $('body').on("selectstart", function(e){ 
	  return false; 
	}); $('body').on("dragstart", function(e){ 
	  return false; 
	}); $('body').on("keydown",function(e){ 
	  var pressedKey = String.fromCharCode(e.keyCode).toLowerCase(); 
	  if (e.ctrlKey && pressedKey == "c") { 
		return false; 
	  } 
	});
  }
  preventRclick();
  
  //우클릭 금지
  document.oncontextmenu = function(){return false;}
  */
  
//커스텀 selectbox
function customSelect(button) {
    const options = button.nextElementSibling;
    const allOptions = document.querySelectorAll('.custom_select .options');
    allOptions.forEach(opt => {
        if (opt !== options) {
            opt.style.display = 'none';
            opt.classList.remove('bottom');
        }
    });

    const viewHeight = document.getElementById('layout').height;

    options.style.display = options.style.display === 'block' ? 'none' : 'block';
	const rect = options.getBoundingClientRect();
    if (rect.bottom > viewHeight) {
        options.classList.add('bottom');
    } else {
        options.classList.remove('bottom');
    }
}

function customSelectSelect(anchor) {
	const items = anchor.closest('.options').querySelectorAll('.item a');
	items.forEach(function(item) {
		item.classList.remove('active');
	});
	anchor.classList.add('active');
	const hiddenInput = anchor.closest('.custom_select').querySelector('input[type="hidden"]');
	const btnSelect = anchor.closest('.custom_select').querySelector('.select_selected');
	hiddenInput.value = anchor.getAttribute('data-id');
	btnSelect.textContent = anchor.textContent;
	anchor.closest('.custom_select .options').style.display = 'none';
	}

	document.addEventListener('click', function(event) {
	if (!event.target.closest('.custom_select')) {
		document.querySelectorAll('.custom_select .options').forEach(function(options) {
			options.style.display = 'none';
		});
	}
});

window.onload = function() {
	const activeItem = document.querySelector('.custom_select .options .item a.active');
	if (activeItem) {
		const hiddenInput = activeItem.closest('.custom_select').querySelector('input[type="hidden"]');
		const btnSelect = activeItem.closest('.custom_select').querySelector('.select_selected');
		hiddenInput.value = activeItem.getAttribute('data-id');
		btnSelect.textContent = activeItem.textContent;
	}
}


//레이어팝업 열고닫기
function openLayer(target) {
    document.querySelector(target).style.display = 'block';
    document.querySelector('html').classList.add('scroll_hidden');
}
function closeLayer(button) {
    button.closest('.layer_popup').style.display = 'none';
    document.querySelector('html').classList.remove('scroll_hidden');
}