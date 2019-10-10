class HouseHoldsController < ApplicationController

    def index 
        house_holds = HouseHold.all
        render json: HouseHoldSerializer.new(house_holds).to_serialized_json
    end 


    def show 
        house_hold = HouseHold.find_by(params[:id])
        render json: HouseHoldSerializer.new(house_hold).to_serialized_json
    end 

    def create 
        house_hold = HouseHold.new(house_hold_params)
        
        house_hold.save 
        render json: house_hold 
      end 

    private 

    def house_hold_params
        params.require(:house_hold).permit(:name, :members)
    end 
end
