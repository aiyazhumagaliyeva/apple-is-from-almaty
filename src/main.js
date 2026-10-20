import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import RAPIER from '@dimforge/rapier3d-compat'

import './style.css'

// ------------------------------------
// COLORS
// ------------------------------------

const BG_COLOR = '#F5F3D1'   // cream background
const INK_COLOR = '#992429'  // red text, aim arrow and hint trace

// ------------------------------------
// FONT — Noto Sans (covers every script in the text)
// ------------------------------------

const FONT_STACK =
  '"Noto Sans", "Noto Sans Arabic", "Noto Sans Armenian", "Noto Sans Bengali", "Noto Sans Devanagari", "Noto Sans Georgian", "Noto Sans Gujarati", "Noto Sans Kannada", "Noto Sans Khmer", "Noto Sans Lao", "Noto Sans Malayalam", "Noto Sans Myanmar", "Noto Sans Sinhala", "Noto Sans Tamil", "Noto Sans Telugu", "Noto Sans Thai", "Noto Sans JP", "Noto Sans KR", "Noto Sans SC", sans-serif'

const fontFamilies = [
  'Noto+Sans:wght@400;500;600',
  'Noto+Sans+Arabic:wght@400;500',
  'Noto+Sans+Armenian:wght@400;500',
  'Noto+Sans+Bengali:wght@400;500',
  'Noto+Sans+Devanagari:wght@400;500',
  'Noto+Sans+Georgian:wght@400;500',
  'Noto+Sans+Gujarati:wght@400;500',
  'Noto+Sans+Kannada:wght@400;500',
  'Noto+Sans+Khmer:wght@400;500',
  'Noto+Sans+Lao:wght@400;500',
  'Noto+Sans+Malayalam:wght@400;500',
  'Noto+Sans+Myanmar:wght@400;500',
  'Noto+Sans+Sinhala:wght@400;500',
  'Noto+Sans+Tamil:wght@400;500',
  'Noto+Sans+Telugu:wght@400;500',
  'Noto+Sans+Thai:wght@400;500',
  'Noto+Sans+JP:wght@400;500',
  'Noto+Sans+KR:wght@400;500',
  'Noto+Sans+SC:wght@400;500'
]

const fontLink = document.createElement('link')
fontLink.rel = 'stylesheet'
fontLink.href =
  'https://fonts.googleapis.com/css2?family=' +
  fontFamilies.join('&family=') +
  '&display=swap'
document.head.appendChild(fontLink)



// ------------------------------------
// THREE.JS
// ------------------------------------

const scene = new THREE.Scene()

scene.background = new THREE.Color(BG_COLOR)
document.body.style.background = BG_COLOR



// ------------------------------------
// APPLE FACT TEXT
// changes language after every bounce
// ------------------------------------

const appleLanguages = [
  
  'Central Asia is generally considered the center of origin for apples due to the genetic variability in specimens there.',

  'Орталық Азия мұндағы үлгілердің генетикалық әртүрлілігіне байланысты алманың шығу орталығы болып саналады.',

  'Центральная Азия обычно считается центром происхождения яблок благодаря генетическому разнообразию образцов, найденных там.',

  'Azja Środkowa jest powszechnie uznawana za centrum pochodzenia jabłek ze względu na różnorodność genetyczną występujących tam okazów.',

  'Zentralasien gilt aufgrund der genetischen Vielfalt der dort vorkommenden Exemplare allgemein als Ursprungszentrum der Äpfel.',

  'L’Asie centrale est généralement considérée comme le centre d’origine des pommes en raison de la diversité génétique des spécimens qui s’y trouvent.',

  'Asia Central se considera generalmente el centro de origen de las manzanas debido a la variabilidad genética de los ejemplares que se encuentran allí.',

  'L’Asia centrale è generalmente considerata il centro di origine delle mele grazie alla variabilità genetica degli esemplari presenti in quest’area.',

  'A Ásia Central é geralmente considerada o centro de origem das maçãs devido à variabilidade genética dos exemplares encontrados nessa região.',

  'Orta Asya, burada bulunan örneklerin genetik çeşitliliği nedeniyle genellikle elmanın köken merkezi olarak kabul edilir.',

  'Η Κεντρική Ασία θεωρείται γενικά το κέντρο προέλευσης των μήλων λόγω της γενετικής ποικιλομορφίας των δειγμάτων που βρίσκονται εκεί.',

  'تُعتبر آسيا الوسطى عمومًا مركز نشأة التفاح بسبب التنوع الجيني في العينات الموجودة هناك.',

  'मध्य एशिया को आम तौर पर सेब की उत्पत्ति का केंद्र माना जाता है, क्योंकि वहाँ पाए जाने वाले नमूनों में आनुवंशिक विविधता है।',

  '中亚通常被认为是苹果的起源中心，因为那里的苹果样本具有很高的遗传多样性。',

  '中央アジアは、そこに存在する個体の遺伝的多様性から、一般にリンゴの原産地の中心と考えられています。',

  '중앙아시아는 그곳의 사과 표본에서 나타나는 유전적 다양성 때문에 일반적으로 사과의 기원 중심지로 여겨집니다.',

  'เอเชียกลางโดยทั่วไปถือเป็นศูนย์กลางต้นกำเนิดของแอปเปิล เนื่องจากความหลากหลายทางพันธุกรรมของตัวอย่างที่พบในพื้นที่นั้น',

  'Trung Á thường được xem là trung tâm nguồn gốc của táo nhờ sự đa dạng di truyền trong các mẫu táo tại đây.',

  'Центральная Азия считается одним из основных центров происхождения яблони благодаря генетическому разнообразию местных образцов.',

  'Centraal-Azië wordt algemeen beschouwd als het oorsprongsgebied van de appel vanwege de genetische variabiliteit van de specimens die er worden aangetroffen.',
  'Centralasien betraktas allmänt som äpplets ursprungscentrum på grund av den genetiska variationen hos exemplaren där.',
  'Centralasien betragtes generelt som æblets oprindelsescentrum på grund af den genetiske variabilitet i prøverne der.',
  'Sentral-Asia regnes generelt som eplets opprinnelsessenter på grunn av den genetiske variabiliteten i eksemplarene der.',
 'Keski-Aasiaa pidetään yleisesti omenan alkuperäkeskuksena siellä esiintyvien näytteiden geneettisen vaihtelun vuoksi.',

'Közép-Ázsiát általában az alma származási központjának tekintik az ott található példányok genetikai változatossága miatt.',

'Střední Asie je obecně považována za centrum původu jablek díky genetické variabilitě tamních exemplářů.',

'Stredná Ázia sa všeobecne považuje za centrum pôvodu jabĺk vďaka genetickej variabilite tamojších exemplárov.',

'Asia Centrală este considerată în general centrul de origine al merelor datorită variabilității genetice a specimenelor de acolo.',
'Централна Азия обикновено се смята за център на произход на ябълките поради генетичното разнообразие на екземплярите там.',
'Центральна Азія зазвичай вважається центром походження яблук завдяки генетичній різноманітності екземплярів, знайдених там.',

'Централна Азија се опште сматра центром порекла јабука због генетичке варијабилности тамошњих примерака.',

'Središnja Azija općenito se smatra središtem podrijetla jabuka zbog genetske varijabilnosti tamošnjih primjeraka.',

'Srednja Azija splošno velja za središče izvora jabolk zaradi genetske raznolikosti tamkajšnjih osebkov.',

'Централна Азија општо се смета за центар на потекло на јаболката поради генетската варијабилност на тамошните примероци.',

'Vidurinė Azija paprastai laikoma obuolių kilmės centru dėl ten esančių pavyzdžių genetinės įvairovės.',

'Vidusāzija parasti tiek uzskatīta par ābolu izcelsmes centru, ņemot vērā tur esošo paraugu ģenētisko variabilitāti.',

'Kesk-Aasiat peetakse üldiselt õunte pärritolukeskuseks sealsete isendite geneetilise varieeruvuse tõttu.',

'ცენტრალური აზია ზოგადად ითვლება ვაშლის წარმოშობის ცენტრად იქ არსებული ნიმუშების გენეტიკური ცვალებადობის გამო.',

'Կենտրոնական Ասիան ընդհանուր առմամբ համարվում է խնձորի ծագման կենտրոնը՝ այնտեղի նմուշների գենետիկական փոփոխականության պատճառով։',

' آسیای مرکزی به دلیل تنوع ژنتیکی نمونه‌های موجود در آنجا، عموماً به عنوان مرکز منشأ سیب در نظر گرفته می‌شود.',
'وسطی ایشیا کو عام طور پر وہاں کے نمونوں میں جینیاتی تغیرات کی وجہ سے سیب کی اصل کا مرکز مانا جاتا ہے۔',
'মধ্য এশিয়াকে সাধারণত সেখানে থাকা নমুনার জেনেটিক বৈচিত্র্যের কারণে আপেলের উৎপত্তি কেন্দ্র হিসেবে বিবেচনা করা হয়।',

'मध्य एशिया को वहाँ मौजूद नमूनों की आनुवंशिक भिन्नता के कारण सामान्यतः सेब का उत्पत्ति स्थल माना जाता है।',

'મધ્ય એશિયાને સામાન્ય રીતે ત્યાંના નમૂનાઓમાં જેનિટિક વિવિધતાના કારણે સફરજનનું ઉત્પત્તિ સ્થાન માનવામાં આવે છે.',

'तेथील नमुन्यांमधील अनुवंशिक विविधतेमुळे मध्य आशियाला सामान्यतः सफरचंदाचे उगमस्थान मानले जाते.',

'அங்குள்ள மாதிரிகளின் மரபணு வேறுபாடு காரணமாக மத்திய ஆசியா பொதுவாக ஆப்பிள்களின் தோற்ற மையமாகக் கருதப்படுகிறது.',

'అక్కడ ఉన్న నమూనాలలో జన్యు వైవిధ్యం కారణంగా మధ్య ఆసియాను సాధారణంగా ఆపిల్స్ యొక్క పుట్టుక కేంద్రంగా పరిగణిస్తారు.',

'ಅಲ್ಲಿನ ಮಾದರಿಗಳಲ್ಲಿನ ತಳೀಯ ವ್ಯತ್ಯಾಸದ ಕಾರಣದಿಂದಾಗಿ ಮಧ್ಯ ಏಷ್ಯಾವನ್ನು ಸಾಮಾನ್ಯವಾಗಿ ಸೇಬುಗಳ ಮೂಲ ಕೇಂದ್ರವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.',

'അവിടെയുള്ള സാമ്പിളുകളിലെ ജനിതക വ്യതിയാനം കാരണം മധ്യേഷ്യയെ പൊതുവെ ആപ്പിളിന്റെ ഉത്ഭവ കേന്ദ്രമായി കണക്കാക്കുന്നു.',

'එහි ඇති සාම්පලවල ජානමය වෙනස්කම් හේතුවෙන් මධ්‍යම ආසියාව සාමාන්‍යයෙන් ඇපල්වල උපන් මධ්‍යස්ථානය ලෙස සැලකේ.',

'ထိုနေရာရှိ နမူနာများ၏ မျိုးရိုးဗီဇ ကွဲပြားမှုကြောင့် ဗဟိုအာရှကို ပန်းသီး၏ မူလအစဗဟိုဌာနအဖြစ် ယေဘုယျအားဖြင့် ယူဆကြသည်။',

'អាស៊ីកណ្តាលត្រូវបានគេចាត់ទុកជាទូទៅថាជាមជ្ឈមណ្ឌលប្រភពដើមនៃផ្លែប៉ោម ដោយសារតែភាពប្រែប្រួលនៃហ្សែននៅក្នុងគំរូនៅទីនោះ។',

'ອາຊີກາງໂດຍທົ່ວໄປແລ້ວຖືວ່າເປັນສູນກາງຕົ້ນກຳເນີດຂອງໝາກແອບເປິ້ນ ເນື່ອງຈາກຄວາມຫຼາກຫຼາຍທາງພັນທຸກໍາຂອງຕົວຢ່າງຢູ່ທີ່ນັ້ນ.',

'Asia Tengah umumnya dianggap sebagai pusat asal usul apel karena variabilitas genetik pada spesimen di sana.',

'Asia Tengah secara umumnya dianggap sebagai pusat asal usul epal disebabkan variabiliti genetik spesimen di sana.',

'Ang Gitnang Asya ay pangkalahatang itinuturing na sentro ng pinagmulan ng mga mansanas dahil sa pagkakaiba-iba ng genetika sa mga sample doon.',

'Asia Tengah umume dianggep minangka pusat asal-usul apel amarga variabilitas genetik ing spesimen ing kono.',

'Asia Tengah umumna dianggap salaku pusat asal-usul apel alatan variabilitas genetik dina spésimén di dinya.',

'Asia Central kwa ujumla inachukuliwa kuwa kituo cha asili cha maapulo kutokana na tofauti za kigenetiki za sampuli za huko.',

'Sentraal-Asië word oor die algemeen beskou as die oorsprongsentrum vir appels vanweë die genetiese variabiliteit in monsters daar.',

'Centra Azio estas ĝenerale konsiderata la centro de origino por pomoj pro la genetika variebleco en la specimenoj tie.',

'Ystyrir Canolbarth Asia yn gyffredinol fel canolfan tarddiad afalau oherwydd yr amrywioldeb genetig yn y sbesimenau yno.',

'Meastar go ginearálta gurb í an Áise Lárnach lárionad tionscnaimh na n-úll mar gheall ar an inathraitheacht ghéiniteach sna heiseamláirí ansin.',

'Thathar a’ meas san fharsaingeachd gur e Meadhan Àisia ionad tùs nan ubhal air sgàth caochlaideachd ghnèitheach nan eisimpleirean an sin.',

'Erdialdeko Asia sagarren jatorri-zentrotzat hartzen da oro har, bertako aleen aldakortasun genetikoa dela eta.',

'LÀsia Central es considera generalment el centre dorigen de les pomes a causa de la variabilitat genètica dels exemplars que shi troben.',

'A Asia Central considérase xeralmente o centro de orixe das mazás debido á variabilidade xenética dos exemplares alí atopados.',

'Mið-Asía er almennt talin vera upprunamiðstöð eflanna vegna erfðafræðilegs breytileika í sýnum þar.' 
]



let languageIndex = 0



const appleText = document.createElement('div')

appleText.textContent = appleLanguages[languageIndex]



Object.assign(

  appleText.style,

  {

    position: 'fixed',

    left: '50%',

    top: '20%',

    transform: 'translateX(-50%)',

    width: '70vw',

    maxWidth: '1300px',

    textAlign: 'center',

    fontFamily: FONT_STACK,

    fontSize: 'clamp(24px, 2.3vw, 72px)',

    fontWeight: '500',

    lineHeight: '1.12',

    color: INK_COLOR,

    pointerEvents: 'none',

    zIndex: '20'

  }

)



document.body.appendChild(appleText)



function changeLanguage() {

  languageIndex =

    (languageIndex + 1) %

    appleLanguages.length



  appleText.textContent =

    appleLanguages[languageIndex]

}





// ------------------------------------
// CAMERA
// ------------------------------------

const camera = new THREE.PerspectiveCamera(

  45,

  window.innerWidth / window.innerHeight,

  0.1,

  100

)



camera.position.set(0, 0, 8)



const renderer = new THREE.WebGLRenderer({

  antialias: true

})



renderer.setSize(

  window.innerWidth,

  window.innerHeight

)



renderer.setPixelRatio(

  Math.min(window.devicePixelRatio, 2)

)



document.body.appendChild(renderer.domElement)





// ------------------------------------
// LIGHTS
// ------------------------------------

scene.add(

  new THREE.AmbientLight(

    0xffffff,

    2

  )

)



const light = new THREE.DirectionalLight(

  0xffffff,

  3

)



light.position.set(4, 6, 8)



scene.add(light)





// ------------------------------------
// 2D AIMING UI
// ------------------------------------

const svgNS = 'http://www.w3.org/2000/svg'



const ui = document.createElementNS(

  svgNS,

  'svg'

)



ui.style.position = 'fixed'

ui.style.inset = '0'

ui.style.width = '100%'

ui.style.height = '100%'

ui.style.pointerEvents = 'none'

ui.style.zIndex = '100'



document.body.appendChild(ui)





// ------------------------------------
// AIM GROUP
// ------------------------------------

const aimGroup =

  document.createElementNS(

    svgNS,

    'g'

  )



aimGroup.style.display = 'none'



ui.appendChild(aimGroup)





// ------------------------------------
// ARROW LINE
// ------------------------------------

const arrowLine =

  document.createElementNS(

    svgNS,

    'line'

  )



// BROWN

arrowLine.setAttribute(

  'stroke',

  INK_COLOR

)



arrowLine.setAttribute(

  'stroke-width',

  '5'

)



arrowLine.setAttribute(

  'stroke-linecap',

  'round'

)



aimGroup.appendChild(

  arrowLine

)





// ------------------------------------
// ARROW HEAD
// ------------------------------------

const arrowHead =

  document.createElementNS(

    svgNS,

    'path'

  )



arrowHead.setAttribute(

  'fill',

  'none'

)



// BROWN

arrowHead.setAttribute(

  'stroke',

  INK_COLOR

)



arrowHead.setAttribute(

  'stroke-width',

  '5'

)



arrowHead.setAttribute(

  'stroke-linecap',

  'round'

)



arrowHead.setAttribute(

  'stroke-linejoin',

  'round'

)



aimGroup.appendChild(

  arrowHead

)





// ------------------------------------
// ANGLE ARC
// ------------------------------------

const angleArc =

  document.createElementNS(

    svgNS,

    'path'

  )



angleArc.setAttribute(

  'fill',

  'none'

)



// BROWN

angleArc.setAttribute(

  'stroke',

  INK_COLOR

)



angleArc.setAttribute(

  'stroke-width',

  '3'

)



angleArc.setAttribute(

  'stroke-linecap',

  'round'

)



aimGroup.appendChild(

  angleArc

)





// ------------------------------------
// TICK GROUP
// ------------------------------------

const tickGroup =

  document.createElementNS(

    svgNS,

    'g'

  )



aimGroup.appendChild(

  tickGroup

)





// ------------------------------------
// ANGLE TEXT
// ------------------------------------

const angleText =

  document.createElementNS(

    svgNS,

    'text'

  )



// BROWN

angleText.setAttribute(

  'fill',

  INK_COLOR

)



angleText.setAttribute(

  'font-size',

  '18'

)



angleText.setAttribute(

  'font-family',

  FONT_STACK

)



aimGroup.appendChild(

  angleText

)





// ------------------------------------
// PHYSICS
// ------------------------------------

await RAPIER.init()



const world =

  new RAPIER.World({

    x: 0,

    y: -16,

    z: 0

  })



// Collision event queue

const eventQueue =

  new RAPIER.EventQueue(true)





// ------------------------------------
// APPLE
// ------------------------------------

let apple = null

let appleBody = null

let appleCollider = null



const loader =

  new GLTFLoader()



loader.load(

  `${import.meta.env.BASE_URL}apple.glb`,



  (gltf) => {



    const model =

      gltf.scene



    model.scale.set(1, 1, 1)



    const box =

      new THREE.Box3()

        .setFromObject(model)



    const center =

      new THREE.Vector3()



    box.getCenter(center)



    model.position.sub(center)



    apple =

      new THREE.Group()



    apple.add(model)



    scene.add(apple)



    const bodyDesc =

      RAPIER.RigidBodyDesc

        .dynamic()

        .setTranslation(0, 2, 0)

        .setLinearDamping(0.01)

        .setAngularDamping(0.02)

        .enabledTranslations(

          true,

          true,

          false

        )



    appleBody =

      world.createRigidBody(

        bodyDesc

      )



    const collider =

      RAPIER.ColliderDesc

        .cuboid(

          0.75,

          0.9,

          0.65

        )

        .setRestitution(0.92)

        .setFriction(0.4)



    // Enable collision events

    collider.setActiveEvents(

      RAPIER.ActiveEvents.COLLISION_EVENTS

    )



    appleCollider =

      world.createCollider(

        collider,

        appleBody

      )

  }

)





// ------------------------------------
// SCREEN BORDERS
// ------------------------------------

let borderBodies = []



let borderColliders = []



function getScreenBounds() {



  const distance =

    camera.position.z



  const fov =

    THREE.MathUtils.degToRad(

      camera.fov

    )



  const height =

    2 *

    Math.tan(fov / 2) *

    distance



  const width =

    height *

    camera.aspect



  return {

    width,

    height

  }

}



function createBorder(

  x,

  y,

  width,

  height

) {



  const body =

    world.createRigidBody(

      RAPIER.RigidBodyDesc

        .fixed()

        .setTranslation(

          x,

          y,

          0

        )

    )



  const collider =

    RAPIER.ColliderDesc

      .cuboid(

        width / 2,

        height / 2,

        2

      )

      .setRestitution(0.8)



  // Enable collision events

  collider.setActiveEvents(

    RAPIER.ActiveEvents.COLLISION_EVENTS

  )



  const colliderHandle =

    world.createCollider(

      collider,

      body

    )



  borderColliders.push(

    colliderHandle

  )



  borderBodies.push(body)

}



function createScreenBorders() {



  borderBodies.forEach(

    body =>

      world.removeRigidBody(

        body

      )

  )



  borderBodies = []

  borderColliders = []



  const bounds =

    getScreenBounds()



  const halfW =

    bounds.width / 2



  const halfH =

    bounds.height / 2



  const t = 0.3



  // bottom

  createBorder(

    0,

    -halfH - t / 2,

    bounds.width,

    t

  )



  // top

  createBorder(

    0,

    halfH + t / 2,

    bounds.width,

    t

  )



  // left

  createBorder(

    -halfW - t / 2,

    0,

    t,

    bounds.height

  )



  // right

  createBorder(

    halfW + t / 2,

    0,

    t,

    bounds.height

  )

}



createScreenBorders()





// ------------------------------------
// MOUSE → WORLD POSITION
// ------------------------------------

const pointer =

  new THREE.Vector2()



const raycaster =

  new THREE.Raycaster()



const mousePlane =

  new THREE.Plane(

    new THREE.Vector3(

      0,

      0,

      1

    ),

    0

  )



function getMouseWorldPosition(event) {



  pointer.x =

    (event.clientX /

      window.innerWidth) *

      2 - 1



  pointer.y =

    -(event.clientY /

      window.innerHeight) *

      2 + 1



  raycaster.setFromCamera(

    pointer,

    camera

  )



  const position =

    new THREE.Vector3()



  raycaster.ray.intersectPlane(

    mousePlane,

    position

  )



  return position

}





// ------------------------------------
// WORLD → SCREEN PIXELS
// ------------------------------------

function worldToScreen(

  x,

  y

) {



  const point =

    new THREE.Vector3(

      x,

      y,

      0

    )



  point.project(camera)



  return {

    x:

      (point.x + 1) /

      2 *

      window.innerWidth,



    y:

      (-point.y + 1) /

      2 *

      window.innerHeight

  }

}





// ------------------------------------
// DRAG TO AIM
// RELEASE TO LAUNCH
// ------------------------------------

let dragging = false



const dragStartWorld =

  new THREE.Vector3()



const dragCurrentWorld =

  new THREE.Vector3()



let mouseScreenX = 0

let mouseScreenY = 0



function updateAimUI() {



  if (!dragging || !appleBody) {

    aimGroup.style.display = 'none'

    return

  }



  aimGroup.style.display = 'block'



  const pos =

    appleBody.translation()



  const center =

    worldToScreen(

      pos.x,

      pos.y

    )



  const cx = center.x

  const cy = center.y



  const dx =

    cx -

    mouseScreenX



  const dy =

    cy -

    mouseScreenY



  const angle =

    Math.atan2(

      dy,

      dx

    )



  const distance =

    Math.hypot(

      dx,

      dy

    )



  // --------------------------------
  // ARROW
  // --------------------------------

  const arrowLength =

    Math.min(

      Math.max(

        distance,

        120

      ),

      330

    )



  const endX =

    cx +

    Math.cos(angle) *

    arrowLength



  const endY =

    cy +

    Math.sin(angle) *

    arrowLength



  arrowLine.setAttribute(

    'x1',

    cx

  )



  arrowLine.setAttribute(

    'y1',

    cy

  )



  arrowLine.setAttribute(

    'x2',

    endX

  )



  arrowLine.setAttribute(

    'y2',

    endY

  )



  // Arrow head

  const headSize = 22



  const backAngle1 =

    angle +

    Math.PI -

    0.45



  const backAngle2 =

    angle +

    Math.PI +

    0.45



  const hx1 =

    endX +

    Math.cos(backAngle1) *

    headSize



  const hy1 =

    endY +

    Math.sin(backAngle1) *

    headSize



  const hx2 =

    endX +

    Math.cos(backAngle2) *

    headSize



  const hy2 =

    endY +

    Math.sin(backAngle2) *

    headSize



  arrowHead.setAttribute(

    'd',

    `

      M ${hx1} ${hy1}

      L ${endX} ${endY}

      L ${hx2} ${hy2}

    `

  )



  // --------------------------------
  // ANGLE ARC
  // --------------------------------

  const radius = 150

  const referenceAngle =

    -Math.PI / 2



  let difference =

    angle -

    referenceAngle



  while (

    difference >

    Math.PI

  ) {

    difference -=

      Math.PI * 2

  }



  while (

    difference <

    -Math.PI

  ) {

    difference +=

      Math.PI * 2

  }



  const startAngle =

    referenceAngle



  const endAngle =

    referenceAngle +

    difference



  const startX =

    cx +

    Math.cos(startAngle) *

    radius



  const startY =

    cy +

    Math.sin(startAngle) *

    radius



  const arcEndX =

    cx +

    Math.cos(endAngle) *

    radius



  const arcEndY =

    cy +

    Math.sin(endAngle) *

    radius



  const sweep =

    difference >= 0

      ? 1

      : 0



  angleArc.setAttribute(

    'd',

    `

      M ${startX} ${startY}

      A ${radius} ${radius}

      0 0 ${sweep}

      ${arcEndX} ${arcEndY}

    `

  )



  // --------------------------------
  // TICKS
  // --------------------------------

  tickGroup.innerHTML = ''



  const degreeDifference =

    THREE.MathUtils.radToDeg(

      difference

    )



  const steps =

    Math.floor(

      Math.abs(

        degreeDifference

      ) / 10

    )



  for (

    let i = 0;

    i <= steps;

    i++

  ) {



    const tickAngle =

      startAngle +

      THREE.MathUtils.degToRad(

        i *

        10 *

        Math.sign(

          difference || 1

        )

      )



    const inner =

      radius - 10



    const outer =

      radius + 10



    const x1 =

      cx +

      Math.cos(tickAngle) *

      inner



    const y1 =

      cy +

      Math.sin(tickAngle) *

      inner



    const x2 =

      cx +

      Math.cos(tickAngle) *

      outer



    const y2 =

      cy +

      Math.sin(tickAngle) *

      outer



    const tick =

      document.createElementNS(

        svgNS,

        'line'

      )



    tick.setAttribute(

      'x1',

      x1

    )



    tick.setAttribute(

      'y1',

      y1

    )



    tick.setAttribute(

      'x2',

      x2

    )



    tick.setAttribute(

      'y2',

      y2

    )



    // BROWN

    tick.setAttribute(

      'stroke',

      INK_COLOR

    )



    tick.setAttribute(

      'stroke-width',

      '3'

    )



    tickGroup.appendChild(tick)

  }



  // --------------------------------
  // ANGLE NUMBER
  // --------------------------------

  const displayAngle =

    Math.round(

      Math.abs(

        degreeDifference

      )

    )



  angleText.textContent =

    `${displayAngle}°`



  const textAngle =

    startAngle +

    difference / 2



  angleText.setAttribute(

    'x',

    cx +

    Math.cos(textAngle) *

    (radius - 35)

  )



  angleText.setAttribute(

    'y',

    cy +

    Math.sin(textAngle) *

    (radius - 35)

  )

}





// ------------------------------------
// PRESS APPLE
// ------------------------------------

renderer.domElement.addEventListener(

  'pointerdown',

  (event) => {



    if (!appleBody || !apple)

      return



    pointer.x =

      (event.clientX /

        window.innerWidth) *

        2 - 1



    pointer.y =

      -(event.clientY /

        window.innerHeight) *

        2 + 1



    raycaster.setFromCamera(

      pointer,

      camera

    )



    const hits =

      raycaster.intersectObject(

        apple,

        true

      )



    if (hits.length === 0)

      return



    hideGhostHand()

    unlockAudio()



    dragging = true



    dragStartWorld.copy(

      getMouseWorldPosition(

        event

      )

    )



    dragCurrentWorld.copy(

      dragStartWorld

    )



    mouseScreenX =

      event.clientX



    mouseScreenY =

      event.clientY



    appleBody.setGravityScale(

      0,

      true

    )



    appleBody.setLinvel(

      {

        x: 0,

        y: 0,

        z: 0

      },

      true

    )



    appleBody.setAngvel(

      {

        x: 0,

        y: 0,

        z: 0

      },

      true

    )



    aimGroup.style.display =

      'block'



    updateAimUI()



    renderer.domElement

      .setPointerCapture(

        event.pointerId

      )

  }

)





// ------------------------------------
// DRAG = AIM
// ------------------------------------

renderer.domElement.addEventListener(

  'pointermove',

  (event) => {



    if (!dragging)

      return



    dragCurrentWorld.copy(

      getMouseWorldPosition(

        event

      )

    )



    mouseScreenX =

      event.clientX



    mouseScreenY =

      event.clientY



    updateAimUI()

  }

)





// ------------------------------------
// RELEASE = LAUNCH
// ------------------------------------

renderer.domElement.addEventListener(

  'pointerup',

  (event) => {



    if (!dragging)

      return



    dragging = false



    aimGroup.style.display =

      'none'



    appleBody.setGravityScale(

      1,

      true

    )



    const launch =

      new THREE.Vector3()

        .subVectors(

          dragStartWorld,

          dragCurrentWorld

        )



    const power = 10



    launch.multiplyScalar(

      power

    )



    launch.clampLength(

      0,

      32

    )



    appleBody.setLinvel(

      {

        x: launch.x,

        y: launch.y,

        z: 0

      },

      true

    )



    appleBody.setAngvel(

      {

        x: 0,

        y: 0,

        z:

          -launch.x * 0.9

      },

      true

    )



    hasShot = true



    if (

      renderer.domElement

        .hasPointerCapture(

          event.pointerId

        )

    ) {

      renderer.domElement

        .releasePointerCapture(

          event.pointerId

        )

    }

  }

)





// ------------------------------------
// COLLISION → CHANGE LANGUAGE
// ------------------------------------

eventQueue.drainCollisionEvents(

  () => {}

)



function processCollisionEvents() {



  if (!appleCollider)

    return



  eventQueue.drainCollisionEvents(

    (

      handle1,

      handle2,

      started

    ) => {



      if (!started)

        return



      const appleHandle =

        appleCollider.handle



      const appleHit =

        handle1 === appleHandle ||

        handle2 === appleHandle



      if (!appleHit)

        return



      const otherHandle =

        handle1 === appleHandle

          ? handle2

          : handle1



      const isBorder =

        borderColliders.some(

          collider =>

            collider.handle ===

            otherHandle

        )



      if (!isBorder)

        return



      changeLanguage()

      onWallHit()

    }

  )

}





// ------------------------------------
// SYNC
// ------------------------------------

function syncApple() {



  if (

    !apple ||

    !appleBody

  )

    return



  const pos =

    appleBody.translation()



  const rot =

    appleBody.rotation()



  apple.position.set(

    pos.x,

    pos.y,

    0

  )



  apple.quaternion.set(

    rot.x,

    rot.y,

    rot.z,

    rot.w

  )

}





// ------------------------------------
// BUZZ ON WALL HIT
// sound + screen shake + phone vibration
// ------------------------------------

let audioCtx = null

function unlockAudio() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (Ctx) audioCtx = new Ctx()
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume()
}

function playBuzz(strength) {
  if (!audioCtx) return

  const now = audioCtx.currentTime
  const length = 0.08 + strength * 0.12

  const osc = audioCtx.createOscillator()
  const gain = audioCtx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(70 + strength * 60, now)
  osc.frequency.exponentialRampToValueAtTime(40, now + length)

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.08 + strength * 0.22, now + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + length)

  osc.connect(gain)
  gain.connect(audioCtx.destination)
  osc.start(now)
  osc.stop(now + length + 0.02)
}

let shakeAmount = 0

function shakeScreen(strength) {
  shakeAmount = Math.max(shakeAmount, 4 + strength * 14)
}

function updateShake() {
  if (shakeAmount < 0.3) {
    shakeAmount = 0
    camera.position.x = 0
    camera.position.y = 0
    return
  }
  // shake the camera, so the black scene always fills the screen
  const unit = 0.007
  camera.position.x = (Math.random() * 2 - 1) * shakeAmount * unit
  camera.position.y = (Math.random() * 2 - 1) * shakeAmount * unit
  shakeAmount *= 0.82
}

let lastHitTime = 0

function onWallHit() {
  const time = performance.now()

  // ignore double hits in corners
  if (time - lastHitTime < 80) return
  lastHitTime = time

  const v = appleBody.linvel()
  const speed = Math.hypot(v.x, v.y)

  // 0 = soft hit, 1 = hardest hit
  const strength = Math.min(speed / 25, 1)

  playBuzz(strength)
  shakeScreen(strength)

  if (navigator.vibrate) navigator.vibrate(20 + Math.round(strength * 40))
}


// ------------------------------------
// APPLE TRAIL ON VERY FAST HITS
// ------------------------------------

const TRAIL_SPEED = 16 // how fast before the trail starts
let trailFrame = 0

const trailLayer = document.createElement('div')

Object.assign(
  trailLayer.style,
  {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '10',
    overflow: 'hidden'
  }
)

document.body.appendChild(trailLayer)

function spawnTrailApple(x, y, speed) {
  const el = document.createElement('div')
  el.textContent = '🍎'

  const size = 50 + Math.min(speed, 32) * 1.8
  const spin = (Math.random() * 2 - 1) * 180

  Object.assign(
    el.style,
    {
      position: 'absolute',
      left: x + 'px',
      top: y + 'px',
      fontSize: size + 'px',
      lineHeight: '1',
      transform: `translate(-50%, -50%) rotate(${spin}deg) scale(1)`,
      opacity: '0.9',
      transition: 'transform 0.6s ease-out, opacity 0.6s ease-out'
    }
  )

  trailLayer.appendChild(el)

  requestAnimationFrame(() => {
    el.style.transform = `translate(-50%, -50%) rotate(${spin * 2}deg) scale(0.2)`
    el.style.opacity = '0'
  })

  setTimeout(() => el.remove(), 650)
}

function updateAppleTrail() {
  updateShake()

  if (!appleBody || dragging) return

  const v = appleBody.linvel()
  const speed = Math.hypot(v.x, v.y)

  if (speed < TRAIL_SPEED) return

  trailFrame++
  if (trailFrame % 2 !== 0) return

  // drop the emoji a little behind the apple, so it does not cover it
  const pos = appleBody.translation()
  const back = 0.6 / speed
  const p = worldToScreen(pos.x - v.x * back, pos.y - v.y * back)

  spawnTrailApple(p.x, p.y, speed)
}


// ------------------------------------
// GHOST HAND HINT
// a retro pixel pointing finger drags the apple diagonally up.
// shows only when the apple is resting and nobody touched it for 3 seconds.
// stops for good after the first shot.
// ------------------------------------

let hasShot = false
let ghostHidden = false

const IDLE_TIME = 3000 // ms of no touch before the hint shows
let lastTouch = performance.now()
let restingSince = null
let hintStart = null

// pixel art: w = white, . = empty
// black outline is added around the white automatically
const HAND_POINT = [
  '..ww.........',
  '..ww.........',
  '..ww.........',
  '..ww.........',
  '..ww.ww......',
  '..ww.ww.ww...',
  '..ww.ww.ww.ww',
  '..wwwwwwwwwww',
  'ww.wwwwwwwwww',
  'wwwwwwwwwwwww',
  '.wwwwwwwwwwww',
  '..wwwwwwwwwww',
  '..wwwwwwwwwww',
  '...wwwwwwwww.',
  '....wwwwwww..',
  '....wwwwwww..'
]

const PIXEL = 4 // size of one pixel on screen

// fingertip position inside the drawing (outline adds 1 pixel)
const TIP_X = (1 + 3) * PIXEL
const TIP_Y = 1 * PIXEL

function pixelHandSVG(rows) {
  const h = rows.length + 2
  const w = rows[0].length + 2
  const grid = []

  for (let y = 0; y < h; y++) {
    grid.push([])
    for (let x = 0; x < w; x++) {
      grid[y].push((rows[y - 1] || '')[x - 1] || '.')
    }
  }

  const isWhite = (x, y) => grid[y] && grid[y][x] === 'w'
  let rects = ''

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let ch = grid[y][x]
      if (
        ch === '.' &&
        (isWhite(x - 1, y) || isWhite(x + 1, y) || isWhite(x, y - 1) || isWhite(x, y + 1))
      ) {
        ch = 'k'
      }
      if (ch === '.') continue
      const fill = ch === 'w' ? '#ffffff' : '#000000'
      rects += `<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`
    }
  }

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w * PIXEL}" height="${h * PIXEL}" ` +
    `viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges">${rects}</svg>`
  )
}

const ghostHand = document.createElement('div')

Object.assign(
  ghostHand.style,
  {
    position: 'fixed',
    left: '0',
    top: '0',
    lineHeight: '0',
    pointerEvents: 'none',
    zIndex: '31',
    opacity: '0',
    transformOrigin: `${TIP_X}px ${TIP_Y}px`
  }
)

ghostHand.innerHTML = pixelHandSVG(HAND_POINT)

// dotted trace the finger leaves behind
const ghostTrace = document.createElement('div')

Object.assign(
  ghostTrace.style,
  {
    position: 'fixed',
    inset: '0',
    pointerEvents: 'none',
    zIndex: '30'
  }
)

document.body.appendChild(ghostTrace)
document.body.appendChild(ghostHand)

const TRACE_GAP = 14 // px between dots

function drawTrace(x1, y1, x2, y2, opacity) {
  const length = Math.hypot(x2 - x1, y2 - y1)
  const count = Math.floor(length / TRACE_GAP)
  let html = ''

  for (let i = 1; i <= count; i++) {
    const k = (i * TRACE_GAP) / length
    const x = Math.round(x1 + (x2 - x1) * k)
    const y = Math.round(y1 + (y2 - y1) * k)
    // square pixel dots, to match the retro finger
    html +=
      `<div style="position:absolute;left:${x - PIXEL / 2}px;top:${y - PIXEL / 2}px;` +
      `width:${PIXEL}px;height:${PIXEL}px;background:${INK_COLOR}"></div>`
  }

  ghostTrace.innerHTML = html
  ghostTrace.style.opacity = String(opacity)
}

// any touch resets the idle timer
window.addEventListener('pointerdown', () => {
  lastTouch = performance.now()
  hintStart = null
})

function hideGhostHand() {
  ghostHidden = true
  ghostHand.style.display = 'none'
  ghostTrace.style.display = 'none'
}

function updateGhostHand() {
  if (ghostHidden || hasShot || !appleBody) return

  const now = performance.now()

  // is the apple resting on the ground?
  const v = appleBody.linvel()
  const speed = Math.hypot(v.x, v.y)

  if (speed > 0.15 || dragging) {
    restingSince = null
    hintStart = null
  } else if (restingSince === null) {
    restingSince = now
  }

  const readyAt =
    restingSince === null
      ? Infinity
      : Math.max(restingSince, lastTouch) + IDLE_TIME

  if (now < readyAt) {
    ghostHand.style.opacity = '0'
    ghostTrace.style.opacity = '0'
    return
  }

  if (hintStart === null) hintStart = now

  // old-school animation: only 10 frames per second
  const raw = ((now - hintStart) % 3000) / 1000
  const t = Math.floor(raw * 10) / 10

  const pos = appleBody.translation()
  const c = worldToScreen(pos.x, pos.y)

  // move diagonally: up, and toward the middle of the screen
  // only as far as the screen allows
  const lift = Math.max(60, Math.min(140, c.y - 40))
  const dirX = c.x > window.innerWidth / 2 ? -1 : 1

  let y = 0
  let opacity = 0
  let scale = 1

  if (t < 0.3) {
    // blink in
    opacity = t < 0.2 ? 0.5 : 1
  } else if (t < 0.6) {
    // press down on the apple
    opacity = 1
    scale = 0.85
  } else if (t < 1.6) {
    // drag up, in steps
    opacity = 1
    scale = 0.85
    y = -lift * ((t - 0.6) / 1.0)
  } else if (t < 1.9) {
    // let go
    opacity = 1
    y = -lift
  } else if (t < 2.1) {
    // blink out
    opacity = 0.5
    y = -lift
  }

  // same distance sideways as up = 45° diagonal
  let x = -y * dirX

  // snap movement to the pixel grid
  y = Math.round(y / PIXEL) * PIXEL
  x = Math.round(x / PIXEL) * PIXEL

  // dots from where the finger pressed to where it is now
  drawTrace(c.x, c.y, c.x + x, c.y + y, opacity)

  ghostHand.style.opacity = String(opacity)
  ghostHand.style.transform =
    `translate(${Math.round(c.x + x - TIP_X)}px, ${Math.round(c.y + y - TIP_Y)}px) scale(${scale})`
}


// ------------------------------------
// LOOP
// ------------------------------------

function animate() {



  requestAnimationFrame(

    animate

  )



  world.step(

    eventQueue

  )



  processCollisionEvents()



  syncApple()



  if (dragging)

    updateAimUI()



  updateGhostHand()

  updateAppleTrail()



  renderer.render(

    scene,

    camera

  )

}



animate()





// ------------------------------------
// RESIZE
// ------------------------------------

window.addEventListener(

  'resize',

  () => {



    camera.aspect =

      window.innerWidth /

      window.innerHeight



    camera

      .updateProjectionMatrix()



    renderer.setSize(

      window.innerWidth,

      window.innerHeight

    )



    createScreenBorders()

  }

)