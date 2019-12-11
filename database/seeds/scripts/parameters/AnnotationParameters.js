module.exports =  {
    // --------------------------
  // 範圍是0-100
  // 0-49是上半部，屬於第一段 pacor-paragraph-id-0
  // 50-100是下半部，屬於第二段 pacor-paragraph-id-1
  // 三種不同類型標註
  
  // 文章來源：https://www.ithome.com.tw/news/133958
  
  annotationDataUpper1: function () {
    return {
      type: 'MainIdea',
      notes: {
        'default': '今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-1',
          start_pos: 1,
          anchor_text: '今年8月新的隱私保護與個資管理'
        }
      ]
    }
  },
  
  annotationDataUpper2: function () {
    return {
      type: 'Confused',
      notes: {
        'question': '對於保護個人資訊和隱私，近年各國政府在相關法令與法規的要求，已經變得越來越普遍'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-1',
          start_pos: 18,
          anchor_text: '對於保護個人資訊和隱私，近年各國政府在相關法令與法規的要求，已經變得越來越普遍'
        }
      ]
    }
  },
  
  annotationDataUpper3: function () {
    return {
      type: 'Clarified',
      notes: {
        'question': 'Cookie的使用分為跨網站（Cross-Site）與同網站（Same-Site）',
        'answer': '通常同網站Cookie用來登入個別網站、記錄使用者偏好，支援網站分析之用。'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-1',
          start_pos: 14,
          anchor_text: '導入這項管理制度，並透過第三方驗證單位，來檢驗相關機制的有效性'
        }
      ]
    }
  },
  
  annotationDataLower1: function () {
    return {
      type: 'MainIdea',
      notes: {
        'default': '今年8月新的隱私保護與個資管理ISO 27701標準出爐，新北市警察局導入這項最新標準，期望讓偵辦各項刑事案件的作業過程，能落實個資與隱私保護，避免民眾個資外洩情事。'
      },
      anchorPositions: [
        {
          seq_id: 1,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-7',
          start_pos: 10,
          anchor_text: '今年8月新的隱私保護與個資管理'
        }
      ]
    }
  },
  
  annotationDataLower2: function () {
    return {
      type: 'Confused',
      notes: {
        'question': '在Ryan Dahl來臺的JSDC演講結束後，我當面問他，企業能不能用Deno？他坦言'
      },
      anchorPositions: [
        {
          seq_id: 1,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-7',
          start_pos: 28,
          anchor_text: '在Ryan Dahl來臺的JSDC演講結束後，我當面問他，企業能不能用Deno？他坦言'
        }
      ]
    }
  },
  
  annotationDataLower3: function () {
    return {
      type: 'Clarified',
      notes: {
        'question': '2009年11月8日，Node.js之父RyanDahl在歐洲JSConf大會',
        'answer': '首度發布了Node.js專案，一鳴驚人，將瀏覽器端的JavaScript技術'
      },
      anchorPositions: [
        {
          seq_id: 1,
          type: 'textContent',
          paragraph_id: 'pacor-paragraph-id-7',
          start_pos: 34,
          anchor_text: '擔任深度學習工程師。現為自由開發者'
        }
      ]
    }
  },
  
  sectionAnnotation1: function () {
    return {
      type: 'SectionMainIdea',
      notes: {
        'default': '相關機制的有效性，特別的'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'section'
        }
      ]
    }
  },
  
  sectionAnnotation2: function () {
    return {
      type: 'SectionMainIdea',
      notes: {
        'default': '曝露於網路上的用戶資料包括電子郵件、帳號建立時間等，並未包括信用卡號或密碼。'
      },
      anchorPositions: [
        {
          seq_id: 1,
          type: 'section'
        }
      ]
    }
  },
  
  sectionAnnotation3: function () {
    return {
      type: 'SectionMainIdea',
      notes: {
        'default': '安全部落格Comparitech Paul Bischoff於本月和安全廠商研究人員Bob Diachenko合作下'
      },
      anchorPositions: [
        {
          seq_id: 0,
          type: 'section'
        }
      ]
    }
  }
}