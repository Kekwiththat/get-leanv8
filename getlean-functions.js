// ======================
// Tab Navigation
// ======================
function tab(section) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(section).classList.add('active');
}

// ======================
// Dashboard Motivation
// ======================
const motivationalQuotes = [
  "Consistency is key!",
  "Every step counts!",
  "Stay strong!",
  "Push yourself today!",
  "One day at a time!"
];
document.getElementById('motivation').innerText = motivationalQuotes[Math.floor(Math.random()*motivationalQuotes.length)];

// ======================
// Program Timer
// ======================
let programStart = null;
let programDays = 42;
function startProgram() {
  const date = document.getElementById('startDate').value;
  if(!date) { alert("Select a start date"); return; }
  programStart = new Date(date);
  programDays = parseInt(document.getElementById('programDays').value) || 42;
  updateDayDisplay();
}
function updateDayDisplay() {
  if (!programStart) return;
  const today = new Date();
  const diff = Math.floor((today - programStart)/ (1000*60*60*24)) + 1;
  document.getElementById('dayDisplay').innerText = `Day ${diff <= programDays ? diff : programDays} of ${programDays}`;
}

// ======================
// Streaks
// ======================
let streak = 0;
function completeDay() {
  streak++;
  document.getElementById('streaks').innerText = `${streak} days completed`;
}

// ======================
// Water Tracker
// ======================
let waterCount = 0;
let waterData = [];
let waterChart = null;
function addWater(){ updateWater(1);}
function removeWater(){ updateWater(-1);}
function resetWater(){ waterCount=0; waterData=[]; updateWaterChart();}
function updateWater(amount){
  waterCount += amount;
  if(waterCount<0) waterCount=0;
  document.getElementById('water').innerText=waterCount;
  const today = new Date(programStart);
  today.setDate(today.getDate()+waterData.length);
  let found = waterData.find(d=>d.x.getTime()===today.getTime());
  if(found) found.y=waterCount;
  else waterData.push({x:today,y:waterCount});
  updateWaterChart();
}
function updateWaterChart(){
  const ctx=document.getElementById('waterChart').getContext('2d');
  if(waterChart) waterChart.destroy();
  const goal = 16;
  waterChart=new Chart(ctx,{
    type:'line',
    data:{
      datasets:[
        {label:'Glasses',data:waterData,fill:false,borderColor:'blue',tension:0,pointStyle:'circle',pointRadius:5},
        {label:'Goal',data:waterData.map(d=>({x:d.x,y:goal})),borderColor:'red',borderDash:[5,5],fill:false,tension:0}
      ]
    },
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:true}}}
  });
}

// ======================
// Meal Tracker
// ======================
let totalCalories=0;
let caloriesData=[];
let mealChart=null;
function addMeal(){
  const chicken=parseFloat(document.getElementById('chicken').value)||0;
  const rice=parseFloat(document.getElementById('brownRice').value)||0;
  const broc=parseFloat(document.getElementById('broccoli').value)||0;
  const juice=parseFloat(document.getElementById('juice').value)||0;
  const custom=parseFloat(document.getElementById('custom').value)||0;
  const cals=chicken*50 + rice*215 + broc*55 + juice + custom;
  totalCalories += cals;
  document.getElementById('calories').innerText=`Calories: ${Math.round(totalCalories)}`;
  const today = new Date(programStart);
  today.setDate(today.getDate()+caloriesData.length);
  let found = caloriesData.find(d=>d.x.getTime()===today.getTime());
  if(found) found.y = totalCalories;
  else caloriesData.push({x:today,y:totalCalories});
  updateMealChart();
}
function resetMeals(){ totalCalories=0; caloriesData=[]; updateMealChart(); document.getElementById('calories').innerText='Calories: 0'; }
function updateMealChart(){
  const ctx=document.getElementById('caloriesChart').getContext('2d');
  const goal=parseInt(document.getElementById('mealGoal')?.value)||1750;
  if(mealChart) mealChart.destroy();
  mealChart=new Chart(ctx,{
    type:'line',
    data:{
      datasets:[
        {label:'Calories',data:caloriesData,fill:false,borderColor:'green',tension:0,pointStyle:'circle',pointRadius:5},
        {label:'Goal',data:caloriesData.map(d=>({x:d.x,y:goal})),borderColor:'red',borderDash:[5,5],fill:false,tension:0}
      ]
    },
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:true}}}
  });
}

// ======================
// 10-Minute Home Workout
// ======================
let workoutTime=600;
let workoutInterval=null;
function startWorkout(){
  if(workoutInterval) return;
  workoutInterval=setInterval(()=>{
    if(workoutTime<=0){ clearInterval(workoutInterval); workoutInterval=null; return; }
    workoutTime--;
    updateWorkoutDisplay();
  },1000);
}
function stopWorkout(){ clearInterval(workoutInterval); workoutInterval=null; }
function resetWorkout(){ workoutTime=600; updateWorkoutDisplay(); clearInterval(workoutInterval); workoutInterval=null; }
function updateWorkoutDisplay(){
  const min=Math.floor(workoutTime/60);
  const sec=workoutTime%60;
  document.getElementById('timer').innerText=`${min}:${sec<10?'0':''}${sec}`;
  document.getElementById('workoutTimerBar').value=600-workoutTime;
}

// ======================
// Gym Workout Plan (Weights in lbs)
// ======================
const gymPlan = [
  {day:"Monday",ex:"Bench Press",reps:"3x10",weight:"110lb",time:"10min"},
  {day:"Monday",ex:"Dumbbell Fly",reps:"3x12",weight:"33lb",time:"8min"},
  {day:"Monday",ex:"Tricep Dips",reps:"3x15",weight:"bodyweight",time:"5min"},
  {day:"Tuesday",ex:"Pull-ups",reps:"3xMax",weight:"bodyweight",time:"8min"},
  {day:"Tuesday",ex:"Row",reps:"3x12",weight:"88lb",time:"10min"},
  {day:"Tuesday",ex:"Dumbbell Curls",reps:"3x12",weight:"26lb",time:"5min"},
  {day:"Wednesday",ex:"Squats",reps:"3x12",weight:"110lb",time:"10min"},
  {day:"Wednesday",ex:"Lunges",reps:"3x12",weight:"55lb",time:"8min"},
  {day:"Wednesday",ex:"Leg Press",reps:"3x12",weight:"176lb",time:"8min"},
  {day:"Thursday",ex:"Shoulder Press",reps:"3x12",weight:"44lb",time:"8min"},
  {day:"Thursday",ex:"Lateral Raise",reps:"3x12",weight:"22lb",time:"5min"},
  {day:"Thursday",ex:"Shrugs",reps:"3x12",weight:"55lb",time:"5min"},
  {day:"Friday",ex:"Chest/Back/Shoulders Combo",reps:"3x12",weight:"varies",time:"20min"},
  {day:"Saturday",ex:"Compound lifts",reps:"3x12",weight:"varies",time:"15min"},
  {day:"Saturday",ex:"Cardio",reps:"-",weight:"-",time:"20min"}
];
const gymList=document.getElementById('gymPlanList');
gymPlan.forEach(e=>{
  const li=document.createElement('li');
  li.innerText=`${e.day} — ${e.ex}: ${e.reps}, ${e.weight}, ${e.time}`;
  gymList.appendChild(li);
});

// ======================
// Weight Tracker
// ======================
let weightData=[];
let weightChart=null;
function addWeight(){
  const val=parseFloat(document.getElementById('weightInput').value);
  if(isNaN(val)) return;
  const today=new Date(programStart);
  today.setDate(today.getDate()+weightData.length);
  weightData.push({x:today,y:val});
  document.getElementById('weightList').innerText=`Current: ${val}`;
  updateWeightChart();
}
function updateWeightChart(){
  const ctx=document.getElementById('weightChart').getContext('2d');
  if(weightChart) weightChart.destroy();
  weightChart=new Chart(ctx,{
    type:'line',
    data:{datasets:[{label:'Weight',data:weightData,fill:false,borderColor:'orange',tension:0,pointStyle:'circle',pointRadius:5}]},
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:false}}}
  });
}

// ======================
// Steps Tracker
// ======================
let stepsData=[];
let stepsChart=null;
function updateSteps(){
  const val=parseInt(document.getElementById('steps').value);
  if(isNaN(val)) return;
  const today=new Date(programStart);
  today.setDate(today.getDate()+stepsData.length);
  stepsData.push({x:today,y:val});
  document.getElementById('stepsDisplay').innerText=`${val} steps`;
  updateStepsChart();
}
function updateStepsChart(){
  const ctx=document.getElementById('stepsChart').getContext('2d');
  if(stepsChart) stepsChart.destroy();
  stepsChart=new Chart(ctx,{
    type:'line',
    data:{datasets:[{label:'Steps',data:stepsData,fill:false,borderColor:'purple',tension:0,pointStyle:'circle',pointRadius:5}]},
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:true}}}
  });
}

// ======================
// Body Fat Tracker
// ======================
let bfData=[];
let bfChart=null;
function saveBodyFat(){
  const val=parseFloat(document.getElementById('bodyfat').value);
  if(isNaN(val)) return;
  const today=new Date(programStart);
  today.setDate(today.getDate()+bfData.length);
  bfData.push({x:today,y:val});
  document.getElementById('bfList').innerText=`${val}%`;
  updateBodyFatChart();
}
function updateBodyFatChart(){
  const ctx=document.getElementById('bodyFatChart').getContext('2d');
  if(bfChart) bfChart.destroy();
  bfChart=new Chart(ctx,{
    type:'line',
    data:{datasets:[{label:'Body Fat',data:bfData,fill:false,borderColor:'teal',tension:0,pointStyle:'circle',pointRadius:5}]},
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:true}}}
  });
}

// ======================
// BMI Calculator
// ======================
function calcBMI(){
  const h=parseFloat(document.getElementById('height').value);
  const w=parseFloat(document.getElementById('bmiWeight').value);
  if(isNaN(h)||isNaN(w)) return;
  const bmi=(w/(h*h))*703;
  document.getElementById('bmi').innerText=`BMI: ${bmi.toFixed(1)}`;
}

// ======================
// Macro Calculator & Meal Plan Integration
// ======================
let macroChart=null;
function calcMacros(){
  const calories=parseInt(document.getElementById('macroCalories').value)||0;
  const protein=Math.round(calories*0.5/4);
  const carbs=Math.round(calories*0.36/4);
  const fat=Math.round(calories*0.14/9);
  document.getElementById('macroResult').innerText=`Protein: ${protein}g, Carbs: ${carbs}g, Fat: ${fat}g`;
  const ctx=document.getElementById('macroMealPlanChart').getContext('2d');
  if(macroChart) macroChart.destroy();
  macroChart=new Chart(ctx,{
    type:'bar',
    data:{labels:['Protein','Carbs','Fat'],datasets:[{label:'grams',data:[protein,carbs,fat],backgroundColor:['#007AFF','#FFA500','#FF3B30']}]},
    options:{indexAxis:'y'}
  });
  generateMealPlan(protein,carbs,fat);
}

// ======================
// Meal Plan Generator
// ======================
function mealPlan(){
  const cals=parseInt(document.getElementById('planCalories').value)||1750;
  generateMealPlan(Math.round(cals*0.5/4),Math.round(cals*0.36/4),Math.round(cals*0.14/9));
}
function generateMealPlan(protein,carbs,fat){
  let chicken = Math.round(protein/7);
  let rice = Math.round(carbs/45);
  let broccoli = 2;
  document.getElementById('plan').innerHTML=
    `Lunch (1pm): Chicken ${chicken}oz, Brown Rice ${rice}cups, Broccoli ${broccoli}cups<br>`+
    `Snack (4pm): Chicken ${Math.round(chicken/2)}oz, Broccoli ${broccoli}cups<br>`+
    `Dinner (8pm): Chicken ${Math.round(chicken/2)}oz, Brown Rice ${Math.round(rice/2)}cups, Broccoli ${broccoli}cups`;
}

// ======================
// Fat Loss Simulator
// ======================
let fatChart=null;
function simulate(){
  const start=parseFloat(document.getElementById('currentWeight').value);
  const goal=parseFloat(document.getElementById('goalWeight').value);
  const days=parseInt(document.getElementById('simDays').value);
  if(isNaN(start)||isNaN(goal)||isNaN(days)||!programStart) return;
  const dailyLoss=(start-goal)/days;
  let data=[];
  for(let i=0;i<days;i++){
    const d=new Date(programStart);
    d.setDate(d.getDate()+i);
    data.push({x:d,y:start-i*dailyLoss});
  }
  const ctx=document.getElementById('weightSimChart').getContext('2d');
  if(fatChart) fatChart.destroy();
  fatChart=new Chart(ctx,{
    type:'line',
    data:{datasets:[{label:'Weight',data:data,fill:false,borderColor:'red',tension:0,pointStyle:'circle',pointRadius:5}]},
    options:{scales:{x:{type:'time',time:{unit:'day'}},y:{beginAtZero:false}}}
  });
}

// ======================
// Notifications
// ======================
function enableNotifications(){
  if(!("Notification" in window)){ alert("Notifications not supported"); return; }
  Notification.requestPermission().then(p=>{
    if(p==="granted") alert("Notifications enabled!");
  });
}
