
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
        house_holds = HouseHold.all 
        chore.save 
        render json: chore
      end 

      def update 
        chore = Chore.find_by(id: params[:id])
        chore.update(chore_params)
          render json: chore
      end 

      def destroy
        chore = Chore.find(params[:id])
        chore.destroy
      end 


      private

      def chore_params
        params.require(:chore).permit(:name, :status, :house_hold_id)
      end 


end
