;(function () {
  var banner = document.querySelector('.banner')
  var bannerItemsContainer = document.querySelector('.banner-items-container')
  var bannerImg = document.querySelector('.banner-img')
  var height = bannerItemsContainer.clientHeight
  var bannerSwitch = createBannerSwitch()
  var init = function () {
    bannerItemsContainer.innerHTML = ''
    for (var i = 0; i < data.length; i++) {
      var a = document.createElement('a')
      a.className = 'banner-item'
      a.title = data[i].title + ':' + data[i].desc
      a.innerHTML = data[i].title + ' <span>' + data[i].desc + '</span>'
      a.style.height = height / data.length + 'px'
      a.style.lineHeight = height / data.length + 'px'
      a.addEventListener('mouseenter', eventHandlers.enterBannerItem)
      a.addEventListener('mouseleave', eventHandlers.leaveBannerItem)
      bannerItemsContainer.append(a)
      bannerSwitch(true, -1)
    }
  }
  var eventHandlers = {
    enterBannerItem() {
      var index = Array.prototype.slice.call(bannerItemsContainer.children).indexOf(this)
      bannerSwitch(false, index)
      setBanner(index)
    },
    leaveBannerItem() {
      var index = Array.prototype.slice.call(bannerItemsContainer.children).indexOf(this)
      bannerSwitch(true, index)
    }
  }
  function setBanner(index = 0) {
    bannerImg.src = data[index].img
    banner.style.backgroundColor = data[index].bg
    var actives = bannerItemsContainer.querySelectorAll('.active')
    for (var i = 0; i < actives.length; i++) {
      actives[i].classList.remove('active')
    }
    bannerItemsContainer.children[index].classList.add('active')
  }
  function createBannerSwitch() {
    var timer
    return function (flag = false, index = 0) {
      function start() {
        if (timer) {
          return
        }
        timer = setInterval(function () {
          index++
          if (index >= data.length) {
            index = 0
          }
          setBanner(index)
        }, 2000)
      }
      function stop() {
        clearInterval(timer)
        timer = null
      }
      if (flag) {
        start()
      } else {
        stop()
      }
    }
  }
  init()
})()
