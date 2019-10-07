class ChoresController < ApplicationController

    def index
        chores = Chore.all
        render json: ChoreSerializer.new(chores).to_serialized_json
      end
     
      def show
        chore = Chore.find_by(id: params[:id])
        render json: ChoreSerializer.new(chore).to_serialized_json
      end

      def create 
        chore = Chore.new(chore_params)
        chore.save 
        render json: chore
      end 


      private

      def chore_params
        params.require(:chore).permit(:name, :status)
      end 


end
