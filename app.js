
const pokedex=document.getElementById('pokedex');

console.log("hello world")



const fetchPokemon= async () =>{
   const url=`https://pokeapi.co/api/v2/pokemon?limit=150`;
   const res=await fetch(url);
   const data=await res.json();
   
console.log('fetching pokemon!!');
const promises=[];

for (let i=1;i<=150;i++){
    const url=`https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res ) =>res.json()));
    

}
Promise.all(promises).then(results =>{
 const pokemon=results.map(data=>({
    name: data.name,
    id:data.id,
    image:data.sprites['front_default'],
    type:data.types.map((type) => type.type.name).join(',')
 }));
 displayPokemon(pokemon);
});

   

};
const displayPokemon=(pokemon)=>{
    console.log(pokemon);
    const pokemonHTMLString =pokemon.map((pokemon)=>`
   <li class="card "  onclick="selectPokemon(${pokemon.id}" >
    
       <img  class="card-image" src="${pokemon.image}" />
       <h2 class="card-title">${pokemon.id}.${pokemon.name}</h2>
       <p >Type:${pokemon.type}</p>
   </li>`
    ).join('');
   
    pokedex.innerHTML= pokemonHTMLString;

};


fetchPokemon();

