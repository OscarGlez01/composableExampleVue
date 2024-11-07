<template>
    <div v-if="response" style="padding: 5px 0; max-width: 607px; display: grid; grid-template-columns: repeat(4, 150px);">
        <div  v-for="pokemon in pokeList">
                <Popper placement="right">
                    <button style="height: 40px; width: 150px;"><a href="#">{{ pokemon.name }}</a></button>
                    <template #content>
                        <img :src="pokemon.sprites?.front_default" :alt="pokemon.name">
                        <h4>Name: {{ pokemon.name }}</h4>
                        <p>
                            <ul>
                                <li>Dex #: {{pokemon.id}}</li>
                                <li>Type: {{pokemon.types[0].type.name}}, {{pokemon.types[1]?.type.name}}</li>
                                <li>Abilities: {{pokemon.abilities[0].ability.name}}, {{pokemon.abilities[1]?.ability.name}}</li>
                            </ul>
                        </p>
                    </template>
                </Popper>
        </div>
    </div>
</template>
<script setup>
import { useGetData } from '@/composables/fetchData';
import { onMounted, ref } from 'vue';
import Popper from "vue3-popper";

const { dataResponse, getData, error, loading } = useGetData();
const response = ref(null);
const pokeList = ref();

async function fetchPokemonData() {
    // Fetching the list of Pokémon
    await getData('https://pokeapi.co/api/v2/pokemon/');
    response.value = dataResponse.value.results;

    // Clear pokeList before adding new data
    pokeList.value = [];

    // Loop through each Pokémon in the response and fetch detailed data
    for (const pokemon of response.value) {
        await getData(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        // Push the fetched data into pokeList
        if (dataResponse) {
            pokeList.value.push(dataResponse.value); // Add each Pokémon's data to the list
        }
    }

    console.log(response.value);
    console.log(pokeList.value)
}
onMounted(fetchPokemonData);

</script>
<style scoped></style>