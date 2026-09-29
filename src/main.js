import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

import RAPIER from '@dimforge/rapier3d-compat'

import './style.css'



// ------------------------------------
// THREE.JS
// ------------------------------------

const scene = new THREE.Scene()

scene.background = new THREE.Color(0x000000)



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

  'Centraal-Azië wordt algemeen beschouwd als het oorsprongsgebied van de appel vanwege de genetische variabiliteit van de specimens die er worden aangetroffen.'
  'Centralasien betraktas allmänt som äpplets ursprungscentrum på grund av den genetiska variationen hos exemplaren där.',
  'Centralasien betragtes generelt som æblets oprindelsescentrum på grund af den genetiske variabilitet i prøverne der.',
  'Sentral-Asia regnes generelt som eplets opprinnelsessenter på grunn av den genetiske variabiliteten i eksemplarene der.'
 ' Keski-Aasiaa pidetään yleisesti omenan alkuperäkeskuksena siellä esiintyvien näytteiden geneettisen vaihtelun vuoksi.',

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

'ಅಲ್ಲಿನ ಮಾದರಿಗಳಲ್ಲಿನ ತಳೀಯ ವ್ಯತ್ಯಾಸದ ಕಾರಣದಿಂದಾಗಿ ಮಧ್ಯ ಏಷ್ಯಾವನ್ನು સામાન્યವಾಗಿ ಸೇಬುಗಳ ಮೂಲ ಕೇಂದ್ರವೆಂದು పరిಗಣಿಸಲಾಗುತ್ತದೆ.',

'അവിടെയുള്ള സാമ്പിളുകളിലെ ജനിതക വ്യതിയാനം കാരണം മധ്യേഷ്യയെ പൊതുവെ ആപ്പിളിന്റെ ഉത്ഭവ കേന്ദ്രമായി കണക്കാക്കുന്നു.',

'එහි ඇති සාම්පලවල ජානමය වෙනස්කම් හේතුවෙන් මධ්‍යම ආසියාව සාමාන්‍යයෙන් ඇපල්වල උපන් මධ්‍යස්ථානය ලෙස සැලකේ.',

'ထိုနေရာရှိ နမူနာများ၏ မျိုးရိုးဗီဇ ကွဲပြားမှုကြောင့် ဗဟိုအာရှကို ပန်းသီး၏ မူလအစဗဟိုဌာနအဖြစ် ယေဘုယျအားဖြင့် ယူဆကြသည်။',

'អាស៊ីកណ្តាលត្រូវបានគេចាត់ទុកជាទូទៅថាជាមជ្ឈមណ្ឌលប្រភពដើមនៃផ្លែប៉ោម ដោយសារតែភាពប្រែប្រួលនៃហ្សែននៅក្នុងគំរូនៅទីនោះ។',

'ອາຊີກາງໂດຍທົ່ວໄປແລ້ວຖືວ່າເປັນศูนย์ກາງຕົ້ນກຳເນີດຂອງໝາກແອບເປິ້ນ ເນື່ອງຈາກຄວາມຫຼາກຫຼາຍທາງພັນທຸກໍາຂອງຕົວຢ່າງຢູ່ທີ່ນັ້ນ.',

'Asia Tengah umumnya dianggap sebagai pusat asal usul apel karena variabilitas genetik pada spesimen di sana.',

'Asia Tengah secara umumnya dianggap sebagai pusat asal usul epal disebabkan variabiliti genetik spesimen di sana.',

'Ang Gitnang Asya ay pangkalahatang itinuturing na sentro ng pinagmulan ng mga mansanas dahil sa pagkakaiba-iba ng genetika sa mga sample doon.',

'Asia Tengah umume dianggep minangka pusat asal-usul apel amarga variabilitas genetik ing spesimen ing kono.',

'Asia Tengah umumna dianggap salaku pusat asal-usul apel alatan variabilitas genetik dina spésimén di dinya.',

'Asia Central kwa ujumla inachukuliwa kuwa kituo cha asili cha maapulo due kwa tofauti za kigenetiki za sampuli za huko.',

'Sentraal-Asië word oor die algemeen beskou as die oorsprongsentrum vir appels vanweë die genetiese variabiliteit in monsters daar.',

'Centra Azio estas ĝenerale konsiderata la centro de origino por pomoj pro la genetika variebleco en la specimenoj tie.',

'Ystyrir Central Asia yn gyffredinol fel canolfan tarddiad afalau oherwydd y amryvariabledd genetig yn y sbesimenau yno.',

'Meastar go ginearálta gurb í an Áise Lárnach lárionad tionscnaimh na n-úll mar gheall ar an inathraitheacht ghéiniteach sna heiseamláirí ansin.',

'Thathar a’ meas san fharsaingeachd gur e Meadhan Àisia ionad tùs nan ubhal air sgàth caochlaideachd ghnèitheach nan eisimpleirean an sin.',

'Erdialdeko Asia sagarren jatorri-zentrotzat hartzen da oro har, bertako aleen aldakortasun genetikoa dela eta'.

'L'Àsia Central es considera generalment el centre d'origen de les pomes a causa de la variabilitat genètica dels exemplars que s'hi troben.',

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

    fontFamily: 'Arial, sans-serif',

    fontSize: 'clamp(24px, 2.5vw, 72px)',

    fontWeight: '300',

    lineHeight: '1.12',

    color: '#ffffff',

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



// WHITE

arrowLine.setAttribute(

  'stroke',

  '#ffffff'

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



// WHITE

arrowHead.setAttribute(

  'stroke',

  '#ffffff'

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



// WHITE

angleArc.setAttribute(

  'stroke',

  '#ffffff'

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



// WHITE

angleText.setAttribute(

  'fill',

  '#ffffff'

)



angleText.setAttribute(

  'font-size',

  '18'

)



angleText.setAttribute(

  'font-family',

  'Arial, sans-serif'

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



    // WHITE

    tick.setAttribute(

      'stroke',

      '#ffffff'

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