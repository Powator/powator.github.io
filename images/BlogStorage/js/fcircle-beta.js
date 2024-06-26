if(typeof(fdataUser)!=="undefined"){
  for(var key in fdataUser){
    if(fdataUser[key]){
      fdata[key]=fdataUser[key];
    }
  }
}
var article_num='',sortNow='',UrlNow='',friends_num='';
var container=document.getElementById('cf-container')||document.getElementById('fcircleContainer');
var localSortNow=localStorage.getItem("sortNow");
var localUrlNow=localStorage.getItem("urlNow");
if(localSortNow&&localUrlNow){
  sortNow=localSortNow;
  UrlNow=localUrlNow;
} else{
  sortNow=fdata.article_sort;
  UrlNow=fdata.apiurl+'all?';
  localStorage.setItem("urlNow",UrlNow);
  localStorage.setItem("sortNow",sortNow);
}
function loadStatistical(sdata){
  article_num=sdata.article_num;
  friends_num=sdata.friends_num;
  var messageBoard=`
    <div id="cf-state" class="cf-new-add">
      <div class="cf-state-data">
        <div class="cf-data-friends" onclick="openToShow()">
          <span class="cf-label">订阅</span>
          <span class="cf-message">${sdata.friends_num}</span>
        </div>
        <div class="cf-data-active" onclick="changeEgg()">
          <span class="cf-label">活跃</span>
          <span class="cf-message">${sdata.active_num}</span>
        </div>
        <div class="cf-data-article" onclick="clearLocal()">
          <span class="cf-label">日志</span>
          <span class="cf-message">${sdata.article_num}</span>
        </div>
      </div>
      <div id="cf-change">
          <span id="cf-change-created" data-sort="created" onclick="changeSort(event)" class="${sortNow=='created'?'cf-change-now':''}">Created</span> | <span id="cf-change-updated" data-sort="updated" onclick="changeSort(event)" class="${sortNow=='updated'?'cf-change-now':''}" >Updated</span>
      </div>
    </div>
    `;
  var loadMoreBtn=`
      <div id="cf-more" class="cf-new-add" onclick="loadNextArticle()"><i class="fas fa-angle-double-down"></i></div>
      <div id="cf-footer" class="cf-new-add">
       <span class="cf-data-lastupdated">更新于：${sdata.last_updated_time}</span>
        Powered by <a target="_blank" href="https://github.com/windshadow233/friends-circle" target="_blank">Friends-Circle</a>
      </div>
      <div id="cf-overlay" class="cf-new-add" onclick="closeShow()"></div>
      <div id="cf-overshow" class="cf-new-add"></div>
    `;
  if(container){
    container.insertAdjacentHTML('beforebegin',messageBoard);
    container.insertAdjacentHTML('afterend',loadMoreBtn);
  }
}
function loadArticleItem(datalist,start,end){
  var articleItem='';
  var articleNum=article_num;
  var endFor=end;
  if(end>articleNum){
    endFor=articleNum;
  }
  if(start<articleNum){
    for(var i=start;i<endFor;i++){
      var item=datalist[i];articleItem+=`
      <div class="cf-article">
        <a class="cf-article-title" href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
        <div class="cf-article-avatar no-lightbox flink-item-icon">
          <img class="cf-img-avatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <span onclick="openMeShow(event)" class="cf-article-author">${item.author}</span>
          <span class="cf-article-time">
            <span class="cf-time-created" style="${sortNow=='created'?'':'display:none'}"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
            <span class="cf-time-updated" style="${sortNow=='updated'?'':'display:none'}"><i class="fas fa-history">更新于</i>${item.updated}</span>
          </span>
        </div>
      </div>
      `;
    }
    container.insertAdjacentHTML('beforeend',articleItem);
    fetchNextArticle();
  }else{document.getElementById('cf-more').outerHTML=`<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>`}}
function loadFcircleShow(userinfo,articledata){
  var showHtml=`
      <div class="cf-overshow">
        <div class="cf-overshow-head">
          <img class="cf-img-avatar avatar" src="${userinfo.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <a class="" target="_blank" rel="noopener nofollow" href="${userinfo.link}">${userinfo.name}</a>
        </div>
        <div class="cf-overshow-content">
  `
  for(var i=0;i<userinfo.article_num;i++){
    var item=articledata[i];showHtml+=`
        <p><a class="cf-article-title"  href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a><span>${item.created}</span></p>
      `;
  }
  showHtml+='</div></div>';
  document.getElementById('cf-overshow').insertAdjacentHTML('beforeend',showHtml);
  document.getElementById('cf-overshow').className='cf-show-now';
}
function fetchNextArticle(){
  var start=document.getElementsByClassName('cf-article').length;
  var end=start+fdata.stepnumber;
  var articleNum=article_num;
  if(end>articleNum){
    end=articleNum
  }
  if(start<articleNum){
    UrlNow=localStorage.getItem("urlNow");
    var fetchUrl=UrlNow+"rule="+sortNow+"&start="+start+"&end="+end;
    fetch(fetchUrl).then(res=>res.json()).then(json=>{
      var nextArticle=eval(json.article_data);
      localStorage.setItem("nextArticle",JSON.stringify(nextArticle))
    })
  } else if(start=articleNum){
    document.getElementById('cf-more').outerHTML=`<div id="cf-more" class="cf-new-add" onclick="loadNoArticle()"><small>一切皆有尽头！</small></div>`;
  }
}
function loadNextArticle(){
  var nextArticle=JSON.parse(localStorage.getItem("nextArticle"));
  var articleItem="";
  for(var i=0;i<nextArticle.length;i++){var item=nextArticle[i];articleItem+=`
      <div class="cf-article">
        <a class="cf-article-title" href="${item.link}" target="_blank" rel="noopener nofollow" data-title="${item.title}">${item.title}</a>
        <div class="cf-article-avatar no-lightbox flink-item-icon">
          <img class="cf-img-avatar avatar" src="${item.avatar}" alt="avatar" onerror="this.src='${fdata.error_img}'; this.onerror = null;">
          <span onclick="openMeShow(event)" class="cf-article-author">${item.author}</span>
          <span class="cf-article-time">
            <span class="cf-time-created" style="${sortNow=='created'?'':'display:none'}"><i class="far fa-calendar-alt">发表于</i>${item.created}</span>
            <span class="cf-time-updated" style="${sortNow=='updated'?'':'display:none'}"><i class="fas fa-history">更新于</i>${item.updated}</span>
          </span>
        </div>
      </div>
      `;
  }
  container.insertAdjacentHTML('beforeend',articleItem);
  fetchNextArticle();
}
function loadNoArticle(){
  var articleSortData=sortNow+"ArticleData";
  localStorage.removeItem(articleSortData);
  localStorage.removeItem("statisticalData");
  document.getElementById('cf-more').remove();
  window.scrollTo(0,document.getElementsByClassName('cf-state').offsetTop);
}
function clearLocal(){
  localStorage.removeItem("updatedArticleData");
  localStorage.removeItem("createdArticleData");
  localStorage.removeItem("nextArticle");
  localStorage.removeItem("statisticalData");
  localStorage.removeItem("sortNow");
  localStorage.removeItem("urlNow");
  pjax.loadUrl('');
}
function changeEgg(){
  if(fdata.jsonurl||fdata.apiurl){
    document.querySelectorAll('.cf-new-add').forEach(el=>el.remove());
    localStorage.removeItem("updatedArticleData");
    localStorage.removeItem("createdArticleData");
    localStorage.removeItem("nextArticle");
    localStorage.removeItem("statisticalData");
    container.innerHTML="";
    UrlNow=localStorage.getItem("urlNow");
    changeUrl=fdata.apiurl+'all?';
    localStorage.setItem("urlNow",changeUrl);
    FetchFriendCircle(sortNow,changeUrl);
  } else{
    clearLocal();
  }
}
function FetchFriendCircle(sortNow,changeUrl){
  var end=fdata.initnumber;
  var fetchUrl=UrlNow+"rule="+sortNow+"&start=0&end="+end;
  if(changeUrl){
    fetchUrl=changeUrl+"rule="+sortNow+"&start=0&end="+end;
  }
  fetch(fetchUrl).then(res=>res.json()).then(json=>{
    var statisticalData=json.statistical_data;
    var articleData=eval(json.article_data);
    var articleSortData=sortNow+"ArticleData";
    loadStatistical(statisticalData);
    loadArticleItem(articleData,0,end);
    localStorage.setItem("statisticalData",JSON.stringify(statisticalData))
    localStorage.setItem(articleSortData,JSON.stringify(articleData))
  })
}
function changeSort(event){
  sortNow=event.currentTarget.dataset.sort;
  localStorage.setItem("sortNow",sortNow);
  document.querySelectorAll('.cf-new-add').forEach(el=>el.remove());
  container.innerHTML="";changeUrl=localStorage.getItem("urlNow");
  initFriendCircle(sortNow,changeUrl);
}
function openMeShow(event){
  event.preventDefault();
  var target = event.target;
  var user = target.innerText;
  var fetchUrl=fdata.apiurl+`post?num=${fdata.popup_article_num}&user=${user}`;
  if(noClick=='ok'){
    noClick='no';
    fetchShow(fetchUrl);
  }
}
function closeShow(){
  document.getElementById('cf-overlay').className-='cf-show-now';
  document.getElementById('cf-overshow').className-='cf-show-now';
  document.getElementById('cf-overshow').innerHTML='';
}
var noClick='ok';
function openToShow(){
  var fetchUrl='';
  fetchUrl=fdata.apiurl+`post?num=${fdata.popup_article_num}`;
  if(noClick=='ok'){
    noClick='no';
    fetchShow(fetchUrl);
  }
}
function fetchShow(url){
  var closeHtml=`
    <div class="cf-overshow-close" onclick="closeShow()"></div>
  `;
  document.getElementById('cf-overlay').className='cf-show-now';
  document.getElementById('cf-overshow').insertAdjacentHTML('afterbegin',closeHtml);
  fetch(url).then(res=>res.json()).then(json=>{
    noClick='ok';
    var statisticalData=json.statistical_data;
    var articleData=eval(json.article_data);
    loadFcircleShow(statisticalData,articleData);
  });
}
function initFriendCircle(sortNow,changeUrl){
  var articleSortData=sortNow+"ArticleData";
  var localStatisticalData=JSON.parse(localStorage.getItem("statisticalData"));
  var localArticleData=JSON.parse(localStorage.getItem(articleSortData));
  container.innerHTML="";
  if(localStatisticalData&&localArticleData){
    loadStatistical(localStatisticalData);
    loadArticleItem(localArticleData,0,fdata.initnumber);
    var fetchUrl=UrlNow+"rule="+sortNow+"&start=0&end="+fdata.initnumber;
    fetch(fetchUrl).then(res=>res.json()).then(json=>{
      var statisticalData=json.statistical_data;
      var articleData=eval(json.article_data);
      var localSnum=localStatisticalData.article_num;
      var newSnum=statisticalData.article_num;
      var localAtile=localArticleData[0].title;
      var newAtile=articleData[0].title;
      if(localSnum!==newSnum||localAtile!==newAtile){
        document.getElementById('cf-state').remove();
        document.getElementById('cf-more').remove();
        document.getElementById('cf-footer').remove();
        container.innerHTML="";
        var articleSortData=sortNow+"ArticleData";
        loadStatistical(statisticalData);
        loadArticleItem(articleData,0,fdata.initnumber);
        localStorage.setItem("statisticalData",JSON.stringify(statisticalData));
        localStorage.setItem(articleSortData,JSON.stringify(articleData));
      }
    })
  }
  else{
    FetchFriendCircle(sortNow,changeUrl);
  }
}
initFriendCircle(sortNow);
