<template>
    <div  class="modal-backdrop" style="width: auto;">
    <div class="thing" style="background-color: black; opacity: 1;
    max-height: 70%;max-width: 80%; overflow-y:auto; overflow-x: none;">
        <p class="my-4 text-center">Rest Timer</p>
        <h3 v-if="countdownActive !== 'active'" class="text-center" :id="`${set._id}:countdownTimer`">{{set.rest}} mins</h3>
        <h3 v-else-if="restTimeInSeconds > 0 && countdown !== 'active'" 
        class="text-center">{{restTimeInSeconds}} secs</h3>
        <button  
            class="btn btn-warning text-center"
             :id="`${set._id}:startTimer`" 
            @click="startTimer(set.rest, set._id)">
                Start Timer
        </button>
        <button  @click="completeSet(set._id, true)" 
        class="btn btn-danger text-center">Complete Set
        </button>    
    </div>

    </div>  
</template>

<script>

export default {
    name: 'SetTimerModal',
    props: ["set", "restTimeInSeconds", "countdownActive"],
    methods: {
        startTimer(rest, setId) {
            this.$emit('startTimer', rest, setId);
        },
        completeSet(setId, isCompleted) {
            this.$emit('completeSet', setId, isCompleted);
        }
    }
}
</script>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    opacity: 1;
  }

  .thing {
    background: white;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
  }



  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  li {
    color: white
  }
  hr {
    background-color: white;
  }
</style>