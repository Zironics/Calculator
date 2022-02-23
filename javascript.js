let screen_operation=document.querySelector('.operation');
let current=document.querySelector(".current");
let clearbtn=document.querySelector('.clear');
let deletebtn=document.querySelector(".delete");
let pad=document.querySelectorAll(".pad div");


let first_operand;
let second_operand;
let operator;

current.textContent='';

function operation(operator,a,b)
{
    if(operator=='+') return a+b;
    if(operator=='-') return a-b;
    if(operator=='*') return a*b;
    if(operator=='/') 
    {
        if(b==0){
            alert('cannot divide by 0');
            return;
        }
        else return a/b;
    }
}

function handleClick(e){
    if(e.classList.contains("number") || e.classList.contains('decimal'))
    {
        if(current.textContent.length<9)
        updateCurrent(e.textContent);
    }
    else if(current.textContent!='')
    {
        if(!e.classList.contains('equal')){
            if(first_operand==undefined)
            {
              first_operand=parseFloat(current.textContent);
              console.log(current.textContent);
              getOperator(e);
              updateOperation(e.textContent,current.textContent,'');
            }
            else 
            {
                second_operand=parseFloat(current.textContent);
                let result=operation(operator,first_operand,second_operand);
                console.log(result);
                if(result==undefined)
                {
                    current.textContent='';
                }
                else 
                {
                    first_operand=result;
                    getOperator(e);
                    updateOperation(e.textContent,first_operand,'');
                }
            }
        }
        else 
        {
            if(first_operand!=undefined)
            {
     
               second_operand=parseFloat(current.textContent);
               let result=operation(operator,first_operand,second_operand);
               if(result!=undefined)
               {
                   updateOperation(operator,first_operand,second_operand);
                   setCurrent(result);
                   first_operand=undefined;
               }
               else current.textContent='';
            }
        }
    }
    else{
        if(!e.classList.contains('equal'))
           if(first_operand!=undefined)
            {
            updateOperation(e.textContent,first_operand,'');
            getOperator(e);
            }
    }
}

function clearCalculator()
{
    screen_operation.textContent='';
    current.textContent='';
    first_operand=undefined;
    second_operand=undefined;
    operator=undefined;
}

function getOperator(a)
{
    if(a.classList.contains('multiply')) operator='*';
    else if(a.classList.contains('add')) operator='+';
    else if(a.classList.contains("substract")) operator='-';
    else operator='/';
}

function deleteCurrent()
{
    if(current.textContent!='')
    {
        let newCurrent=current.textContent.slice(0,current.textContent.length-1);
        current.textContent=newCurrent;
    }
}

deletebtn.addEventListener('click',deleteCurrent);

function setCurrent(result)
{
    current.textContent=result;
}

function updateCurrent(character)
{
    if(character!='.')
    {
      current.textContent+=character;
    }
    else
    {
        if(!current.textContent.includes('.'))
        {
         if(current.textContent!='') current.textContent+=character;
         else current.textContent='0'+character;
        }
        else alert("you cannot have more then one decimal point");
    }
}

clearbtn.addEventListener("click",clearCalculator);

function updateOperation(operator,a,b)
{
    screen_operation.textContent=a+operator+b;
    if(b!='') screen_operation.textContent+='=';
    current.textContent='';
}

pad.forEach(element => {
    element.addEventListener('click',function(e){
        handleClick(e.target);
    });
});


window.addEventListener('keydown',function(e){
  
    if(e.code=="Backspace")
    {
        deleteCurrent();
    }
    else
    {
        let element=document.querySelector(`div[data-code='${e.code}']`);
        handleClick(element);
    }
});
