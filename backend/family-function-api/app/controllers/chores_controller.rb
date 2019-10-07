class ChoresController < ApplicationController

    def index
        chores = Chore.all
        render json: ChoreSerializer.new(chores).to_serialized_json
      end
     
      def show
        chore = Chore.find_by(id: params[:id])
        render json: ChoreSerializer.new(chore).to_serialized_json
      end


end
