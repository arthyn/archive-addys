---
title: 'About the Order'
process:
    markdown: true
    twig: false
---

<div class="page-header">
    <h1>About the Order</h1>
</div>
<div class="panel">
    <div class="mw7 center tc white">
        <div class="motto upper-tracked-regular gold mb4">
            <p class="f3-l tracked-uber">The uninspired <strong>envy us.</strong></p>
            <p class="f3-l tracked-uber">The shrewd <strong>support us.</strong></p>
            <p class="f3-l tracked-uber">The creative <strong>join us.</strong></p>
        </div>
        <p class="about-copy mw6 center"><strong>Since the advent of time, we’ve been here.</strong> Observing and inﬂuencing, shrouded in shadows. Prying into the hopes and pulling on the heartstrings of humanity. Calling multitudes to action and guiding their destinies &mdash; without their even knowing it.</p>
        <p class="about-copy mw6 center">Faced with mediocrity, we are militant. From blank nothingness, we birth creation. And staring into the gaping maw of deadlines, we deliver. Though our earthly bodies are rarely seen, the fruits of our labor are omnipresent.</p>
        <p class="f3-l upper-tracked-regular gold"><strong>WE ARE THE ORDER OF THE ETERNAL EYE.</strong></p>
        <hr class="short-separator">
        <h2 class="gold" style="margin-top:7rem;margin-bottom: .5rem;">Who We Are</h2>
        <p style="margin-bottom:0;">Our members are many, but our vision is one.</p>
    </div>
</div>
<!--<div id="tarot-switcher" class="panel">
    <div class="tarot-picker flex flex-wrap justify-around tc ttu">
        <a class="tarot-choice creator active" href="#creator">
            <span class="border square-border"></span>
            <img src="../images/ADDY_tarot-icon-01.png">
            <p>Creator</p>
        </a>
        <a class="tarot-choice scribe disabled">
            <span class="border diamond-border"></span>
            <img src="../images/ADDY_tarot-icon-02.png">
            <p>?</p>
        </a>
        <a class="tarot-choice seer disabled">
            <span class="border square-border"></span>
            <img src="../images/ADDY_tarot-icon-03.png">
            <p>?</p>
        </a>
        <a class="tarot-choice ancillary disabled">
            <span class="border diamond-border"></span>
            <img src="../images/ADDY_tarot-icon-04.png">
            <p>?</p>
        </a>
        <a class="tarot-choice herald disabled">
            <span class="border square-border"></span>
            <img src="../images/ADDY_tarot-icon-05.png">
            <p>?</p>
        </a>
        <a class="tarot-choice keeper disabled">
            <span class="border diamond-border"></span>
            <img src="../images/ADDY_tarot-icon-06.png">
            <p>?</p>
        </a>
        <a class="tarot-choice observer disabled">
            <span class="border square-border"></span>
            <img src="../images/ADDY_tarot-icon-07.png">
            <p>?</p>
        </a>
        <a class="tarot-choice technician disabled">
            <span class="border diamond-border"></span>
            <img src="../images/ADDY_tarot-icon-08.png">
            <p>?</p>
        </a>     
    </div>
    <div class="tarot-details flex flex-wrap mt4 white creator">
        <div class="tarot-copy w-100 w-50-l pr5-l">
            <div class="f2 goudy">The Creator</div>
            <p class="sub-title upper-tracked-regular">An Eye For Elegance.</p>
            <p>Divinely inspired, and unflinchingly artistic, the CREATOR births deliberate design that captivates. From steady hands, fine lines, ornate flourishes and hypnotic bursts of colour spring forth. Should you fall under their spell, fear not. Such beauty tends to work its way under the skin.</p>
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Creators</h3>
            <p>Georgia O'Keeffe<br>
                Milton Glaser<br>
                The Lord, Himself
            </p>
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3>
            <p><em>"Do you want it right now, or do you want it right?"</em></p>
        </div>
        <div class="tarot-card-container w-100 w-50-l">
            <div id="creator" class="tarot-card active">
                <img class="front" src="../images/tarot-card-front-1.png" alt="Creator">
                <img class="back" src="../images/tarot-card-back-1.png" alt="">
            </div>
        </div>
    </div>
</div>-->
<div id="tarot-switcher" class="panel">
    <div class="tarot-picker flex flex-wrap justify-around tc ttu">
        <div v-for="card in tarotDeck" :key="card.id">
            <a class="tarot-choice" :class="[card.name, card.name === currentCard.name ? 'active' : '', card.disabled ? 'disabled' : '']"  v-bind:href="!card.disabled ? '#/' + card.name : ''">
                <span class="border" :class="{'diamond-border': isDiamond(card)}"></span>
                <img v-bind:src="'../images/ADDY_tarot-icon-0' + card.id + '.png'">
                <p v-if="card.disabled">?</p>
                <p v-else>{{card.name}}</p>
            </a>
        </div>     
    </div>
    <div class="tarot-details flex flex-wrap mt4 white" :class="currentCard.name">
        <div class="tarot-copy w-100 w-50-l pr5-l">
            <h2 class="mb4 pt4">Who We Are</h2>
            <div class="f2 goudy">{{ currentCard.title }}</div>
            <p class="sub-title upper-tracked-regular">{{ currentCard.subtitle }}</p>
            <div v-html="currentCard.description"></div>
        </div>
        <div class="tarot-card-container relative w-100 w-50-l">
            <div v-for="card in revealedCards" :id="card.name" class="tarot-card" :class="card.name === currentCard.name ? 'active' : ''">
                <div class="card-holder">
                    <img class="front" :src="'../images/tarot-card-front-' + card.id + '.png'" :alt="card.title">
                    <img class="back" :src="'../images/tarot-card-back-' + card.id + '.png'" alt="">
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    var tarotCards = [
        {
            id: '1',
            name: 'creator',
            title: 'The Creator',
            subtitle: 'An Eye For Elegance.',
            description: '<p>Divinely inspired, and unflinchingly artistic, the CREATOR births deliberate design that captivates. From steady hands, fine lines, ornate flourishes and hypnotic bursts of colour spring forth. Should you fall under their spell, fear not. Such beauty tends to work its way under the skin.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Creators</h3> \
            <p>Georgia O\'Keeffe<br> \
                Milton Glaser<br> \
                The Lord, Himself \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Do you want it right now, or do you want it right?"</em></p>',
            disabled: false
        },
        {
            id: '2',
            name: 'scribe',
            title: 'The Scribe',
            subtitle: 'An Eye for Eloquence',
            description: '<p>Wielding words as instruments of influence, the SCRIBE crafts copy that moves mountains. Ever articulate, and never verbose, their every syllable is pored over with precision. Succinct equals success. So we are done here.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Scribes</h3> \
            <p>David Abbott, BBDO<br> \
                Peggy Olson, SCDP<br> \
                Dr. Seuss, BOOKS \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Just do greeking for now."</em></p>',
            disabled: false
        },
        {
            id: '3',
            name: 'seer',
            title: 'The Seer',
            subtitle: 'An Eye For Aesthetics',
            description: '<p>With the clap of a shutter, and the pop of a flashbulb, the SEER’s viewfinder captures all. Photo to video. Audio to Premiere Pro. They’re AV virtuosos, fully equipped to present life precisely as it is — or at least as it should be. Step into their studio — but remember to keep your soul on a short leash.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Seers</h3> \
            <p>Michel Gondry<br> \
                Sofia Coppola<br> \
                Stanley Kubrick \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Perfect. Let’s do it again."</em></p>',
            disabled: false
        },
        {
            id: '4',
            name: 'herald',
            title: 'The Herald',
            subtitle: 'An Eye For Appearances',
            description: '<p>Persistent, pithy and mercilessly on-message, the HERALD spins public relations gold. Always on the lookout for a fresh angle, they reassure even the most skeptical nonbelievers. But don’t fret, for not all communication is manipulation. Or so they’d have you think.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Heralds</h3> \
            <p>SUBWAY PR Director<br> \
                BP PR Director<br> \
                Kellyanne Conway \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Let me get back to you."</em></p>',
            disabled: false
        },
        {
            id: '5',
            name: 'keeper',
            title: 'The Keeper',
            subtitle: 'An Eye For Harmony',
            description: '<p>In a world of Type A’s, B2Bs and LLCs, the KEEPER is the nexus of account service nirvana. So fear not, silent, struggling creators, for you’ve got someone calculated is in your corner. Effortlessly cool and cautiously conciliatory, they’re living proof that peace is the ultimate power move.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Heralds</h3> \
            <p>SUBWAY PR Director<br> \
                BP PR Director<br> \
                Kellyanne Conway \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Let me get back to you."</em></p>',
            disabled: true
        },
        {
            id: '6',
            name: 'keeper',
            title: 'The Herald',
            subtitle: 'An Eye For Appearances',
            description: '<p>Persistent, pithy and mercilessly on-message, the HERALD spins public relations gold. Always on the lookout for a fresh angle, they reassure even the most skeptical nonbelievers. But don’t fret, for not all communication is manipulation. Or so they’d have you think.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Heralds</h3> \
            <p>SUBWAY PR Director<br> \
                BP PR Director<br> \
                Kellyanne Conway \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Let me get back to you."</em></p>',
            disabled: true
        },
        {
            id: '7',
            name: 'observer',
            title: 'The Herald',
            subtitle: 'An Eye For Appearances',
            description: '<p>Persistent, pithy and mercilessly on-message, the HERALD spins public relations gold. Always on the lookout for a fresh angle, they reassure even the most skeptical nonbelievers. But don’t fret, for not all communication is manipulation. Or so they’d have you think.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Heralds</h3> \
            <p>SUBWAY PR Director<br> \
                BP PR Director<br> \
                Kellyanne Conway \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Let me get back to you."</em></p>',
            disabled: true
        },
        {
            id: '8',
            name: 'technician',
            title: 'The Herald',
            subtitle: 'An Eye For Appearances',
            description: '<p>Persistent, pithy and mercilessly on-message, the HERALD spins public relations gold. Always on the lookout for a fresh angle, they reassure even the most skeptical nonbelievers. But don’t fret, for not all communication is manipulation. Or so they’d have you think.</p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Legendary Heralds</h3> \
            <p>SUBWAY PR Director<br> \
                BP PR Director<br> \
                Kellyanne Conway \
            </p> \
            <h3 style="font-size: 1rem;margin-bottom: .5rem;">Personal Motto</h3> \
            <p><em>"Let me get back to you."</em></p>',
            disabled: true
        }];
</script>