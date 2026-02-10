import React from 'react';
import { MessageCircle, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-loui-black text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        
        <div className="md:w-1/2">
          <h2 className="text-[15vw] md:text-[6vw] leading-none font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 opacity-50 select-none">
            LOUI.
          </h2>
          <p className="mt-8 text-gray-400 text-sm max-w-sm">
            LOUI STUDIO. Вышиваем так, что конкуренты завидуют, а гости фоткают.
            <br />© {new Date().getFullYear()}
          </p>
        </div>

        <div className="md:w-1/2 flex flex-col gap-8 md:items-end">
          <div className="text-right">
            <h3 className="text-sm uppercase text-gray-500 tracking-widest mb-4">Контакты</h3>
            <div className="flex flex-col gap-4 items-start md:items-end">
              <a href="#" className="text-2xl hover:text-loui-blue transition-colors flex items-center gap-3">
                <span className="md:hidden">Telegram</span> +7 (925) 469-13-39
              </a>
              <a href="#" className="text-2xl hover:text-loui-blue transition-colors flex items-center gap-3">
                <span className="md:hidden">WhatsApp</span> +7 (925) 716-68-85
              </a>
              
              <div className="flex gap-4 mt-2">
                <a href="#" className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center hover:bg-loui-blue hover:border-loui-blue transition-all">
                   <MessageCircle size={20} />
                </a>
                <a href="#" className="w-12 h-12 border border-gray-700 rounded-full flex items-center justify-center hover:bg-loui-blue hover:border-loui-blue transition-all">
                   <Phone size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="text-right mt-8">
             <h3 className="text-sm uppercase text-gray-500 tracking-widest mb-4">Локация</h3>
             <p className="text-xl flex items-center gap-2 justify-end">
               Москва, ул.Новодмитровская 5а с3, офис 609 <MapPin className="text-loui-orange" />
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;