require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it "assigns @message" do
        expect(assaigns(:message)).to be_a_new(Messages)
      end

      it "assigns @group" do
        expect(assaigns(:group)).to eq group
      end

      it "render index" do
        expect(response).to render_template :index
      end
    end
    
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
      
      it "redirect to new_user_session_path" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
  
  describe '#create' do
    context "log in and success" do

      it "render create" do
        expect(response).to render_template :create
      end
    end
    
    context "log in and false" do
      it "redirect to group_messages_path" do
        expect(response).to redirect_to(group_messages_path)
      end
    end
    
    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end
  
      it "redirect to new_user_session_path" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end