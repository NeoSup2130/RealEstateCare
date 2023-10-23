<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Wie zijn wij?</h2>
    <p>
      RealEstateCare is een dienstverlenende organisatie die voor verschillende opdrachtgever zoals
      woningcoöperaties en vastgoedontwikkelaars woningen onderhoudt, verbetert en inspecteert. Hier
      spelen veel en ingewikkelde bedrijfsprocessen en wordt veel data verwerkt. Eén aspect van deze
      bedrijfsprocessen is het op locatie inspecteren van een pand en het opnemen van schade (door huurders,
      ongedierte of calamiteiten), achterstallig onderhoud, verouderde installaties, brandgevaarlijke situaties en
      al dan niet ongewenste modificaties van huurders.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.hello {
  width: 45vw;
  margin: 0 auto;
}

p {
  text-align: justify;
}
a {
  color: rgb(0,170,162);
}
</style>
