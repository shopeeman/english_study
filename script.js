const sentences = [
  {independent:"I stayed home", dependent:"it was raining", correctConj:"because", choices:["because","although","if","when"], explanation:"'because' expresses the cause."},
  {independent:"He improved his grades", dependent:"he studied harder", correctConj:"because", choices:["although","because","while","unless"], explanation:"Because it expresses the cause, 'because' is appropriate."},
  {independent:"I will call you", dependent:"I arrive", correctConj:"when", choices:["if","when","unless","though"], explanation:"It means calling when you arrive."},
  {independent:"She went out", dependent:"it was raining", correctConj:"although", choices:["although","because","so","if"], explanation:"'although' expresses adversative conjunction."},
  {independent:"You can’t enter", dependent:"you have a ticket", correctConj:"unless", choices:["if","because","unless","while"], explanation:"'Unless' means 'unless...'"},
  {independent:"I will buy a new car", dependent:"I get a bonus", correctConj:"if", choices:["if","because","although","when"], explanation:"'if' expresses condition."},
  {independent:"He passed the exam", dependent:"he studied hard", correctConj:"because", choices:["because","although","when","unless"], explanation:"'because' shows the reason."},
  {independent:"I enjoy reading", dependent:"I have free time", correctConj:"when", choices:["if","unless","when","although"], explanation:"'when' indicates timing."},
  {independent:"She didn’t come to the party", dependent:"she was sick", correctConj:"because", choices:["because","although","while","unless"], explanation:"'because' shows the cause."},
  {independent:"He plays soccer", dependent:"he is tired", correctConj:"although", choices:["although","because","if","when"], explanation:"'although' expresses contrast."},
  {independent:"I will go jogging", dependent:"it doesn’t rain", correctConj:"if", choices:["if","unless","because","although"], explanation:"'if' expresses a condition."},
  {independent:"We stayed inside", dependent:"it was cold", correctConj:"because", choices:["because","although","when","if"], explanation:"'because' shows reason."},
  {independent:"She smiled", dependent:"she was nervous", correctConj:"although", choices:["although","because","unless","when"], explanation:"'although' expresses contrast."},
  {independent:"You won’t succeed", dependent:"you don’t try", correctConj:"unless", choices:["if","unless","because","when"], explanation:"'unless' shows exception."},
  {independent:"I met him", dependent:"I went to Paris", correctConj:"when", choices:["if","although","when","because"], explanation:"'when' indicates timing."},
  {independent:"He left early", dependent:"he was tired", correctConj:"because", choices:["because","although","if","unless"], explanation:"'because' shows reason."},
  {independent:"I kept walking", dependent:"it was raining", correctConj:"although", choices:["although","if","because","unless"], explanation:"'although' expresses contrast."},
  {independent:"She will succeed", dependent:"she works hard", correctConj:"if", choices:["if","because","unless","although"], explanation:"'if' shows condition."},
  {independent:"We canceled the picnic", dependent:"it rained", correctConj:"because", choices:["because","although","if","unless"], explanation:"'because' indicates reason."},
  {independent:"He smiled", dependent:"he was scared", correctConj:"although", choices:["although","because","if","when"], explanation:"'although' shows contrast."},
  {independent:"I will help you", dependent:"you ask me", correctConj:"if", choices:["if","because","unless","although"], explanation:"'if' shows condition."},
  {independent:"They couldn’t attend", dependent:"they were sick", correctConj:"because", choices:["because","although","when","unless"], explanation:"'because' shows reason."},
  {independent:"I enjoy swimming", dependent:"the weather is hot", correctConj:"when", choices:["if","when","although","unless"], explanation:"'when' indicates timing."},
  {independent:"She stayed calm", dependent:"she was nervous", correctConj:"although", choices:["although","because","if","when"], explanation:"'although' expresses contrast."},
  {independent:"You won’t pass", dependent:"you don’t study", correctConj:"unless", choices:["if","unless","because","when"], explanation:"'unless' expresses exception."},
  {independent:"I started laughing", dependent:"he told a joke", correctConj:"when", choices:["when","if","although","because"], explanation:"'when' shows timing."},
  {independent:"He succeeded", dependent:"he tried hard", correctConj:"because", choices:["because","although","if","unless"], explanation:"'because' shows reason."},
  {independent:"She continued walking", dependent:"it was raining", correctConj:"although", choices:["although","if","because","unless"], explanation:"'although' expresses contrast."},
  {independent:"I will join the meeting", dependent:"I finish my work", correctConj:"when", choices:["if","when","unless","although"], explanation:"'when' shows timing."},
  {independent:"They passed the test", dependent:"they studied", correctConj:"because", choices:["because","although","if","unless"], explanation:"'because' shows reason."},
  {independent:"I will go shopping", dependent:"it stops raining", correctConj:"when", choices:["when","if","although","because"], explanation:"'when' indicates timing."},
  {independent:"She kept smiling", dependent:"she was sad", correctConj:"although", choices:["although","because","if","when"], explanation:"'although' expresses contrast."},
  {independent:"You can’t enter", dependent:"you have a ticket", correctConj:"unless", choices:["if","unless","because","while"], explanation:"'unless' shows exception."}
];

let idx = -1, correct = 0, total = 0;
const independentText = document.getElementById('independentText');
const dependentText = document.getElementById('dependentText');
const choicesDiv = document.getElementById('choices');
const correctCount = document.getElementById('correctCount');
const totalCount = document.getElementById('totalCount');
const nextBtn = document.getElementById('nextBtn');
const explainDiv = document.getElementById('explain');

const bgm = document.getElementById('bgm');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

bgm.volume = 0.2;
bgm.play();

function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function pickProblem(){
  idx = Math.floor(Math.random()*sentences.length);
  return JSON.parse(JSON.stringify(sentences[idx]));
}

function render(problem){
  explainDiv.style.display='none';
  choicesDiv.innerHTML='';
  independentText.textContent = problem.independent;
  dependentText.textContent = problem.dependent;
  const opts = [...problem.choices];
  shuffle(opts);
  opts.forEach(opt=>{
    const b = document.createElement('button');
    b.className = 'choice';
    b.textContent = opt;
    b.addEventListener('click', ()=>handleChoice(opt, problem, b));
    choicesDiv.appendChild(b);
  });
}

function handleChoice(selected, problem, btnElement){
  total++;
  totalCount.textContent = total;
  const sel = (''+selected).toLowerCase().trim();
  const ok = sel === problem.correctConj.toLowerCase();
  if(ok){
    correct++;
    correctCount.textContent = correct;
    if(btnElement) btnElement.classList.add('correct');
    correctSound.currentTime = 0;
    correctSound.play();
  } else {
    if(btnElement) btnElement.classList.add('wrong');
    Array.from(choicesDiv.querySelectorAll('button.choice')).forEach(b=>{
      if(b.textContent.toLowerCase()===problem.correctConj.toLowerCase())
        b.classList.add('correct');
    });
    wrongSound.currentTime = 0;
    wrongSound.play();
  }
  const full=`${problem.independent} ${problem.correctConj} ${problem.dependent}.`;
  explainDiv.innerHTML=`<strong>Complete Sentence:</strong> ${full}<br><small>${problem.explanation||''}</small>`;
  explainDiv.style.display='block';
}

nextBtn.addEventListener('click',()=>{
  const prob=pickProblem();
  render(prob);
});

// 初期表示
nextBtn.click();
