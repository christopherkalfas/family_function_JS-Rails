class ChoresController < ApplicationController

    def index
        chores = Chore.all
        render json: chores, include: [:house_hold]
      end
end
