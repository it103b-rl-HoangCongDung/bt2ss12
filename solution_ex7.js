const prompt = require('prompt-sync')();

let subscriptions = [
    { id: 'SUB_001', name: 'Nguyen Van A', plan: 'PERSONAL', devices: 2 },
    { id: 'SUB_002', name: 'Tran Thi B', plan: 'FAMILY', devices: 5 },
    { id: 'SUB_003', name: 'Le Van C', plan: 'PERSONAL', devices: 2 }
];

function generateId() {
    let nextNum = subscriptions.length + 1;
    return 'SUB_' + String(nextNum).padStart(3, '0');
}

function listSubscriptions() {
    console.log('\n=== DANH SACH THUE BAO CLOUD ===');
    if (subscriptions.length === 0) {
        console.log('Chua co thue bao nao trong he thong.');
        return;
    }
    console.table(subscriptions);
}

function addSubscription() {
    console.log('\n=== THEM THUE BAO MOI ===');
    let name = prompt('Nhap ten khach hang: ');
    if (!name.trim()) {
        console.log('Loi: Ten khach hang khong duoc de trong!');
        return;
    }
    
    console.log('Chon goi cuoc: 1. PERSONAL (2 thiet bi) | 2. FAMILY (5 thiet bi)');
    let planChoice = prompt('Nhap lua chon (1 hoac 2): ');
    let plan = '';
    let devices = 0;
    
    if (planChoice === '1') {
        plan = 'PERSONAL';
        devices = 2;
    } else if (planChoice === '2') {
        plan = 'FAMILY';
        devices = 5;
    } else {
        console.log('Loi: Lua chon goi cuoc khong hop le!');
        return;
    }
    
    let newSub = {
        id: generateId(),
        name: name,
        plan: plan,
        devices: devices
    };
    
    subscriptions.push(newSub);
    console.log('Them thanh cong thue bao voi ma: ' + newSub.id);
}

function updateSubscription() {
    console.log('\n=== CAP NHAT GOI CUOC THUE BAO ===');
    let targetId = prompt('Nhap ma thue bao can cap nhat (VD: SUB_001): ');
    let index = subscriptions.findIndex(sub => sub.id === targetId);
    
    if (index === -1) {
        console.log('Khong tim thay thue bao co ma ' + targetId);
        return;
    }
    
    let newName = prompt('Nhap ten moi (Bo trong neu giu nguyen): ');
    if (newName.trim() !== '') {
        subscriptions[index].name = newName;
    }
    
    console.log('Chon goi cuoc moi: 1. PERSONAL | 2. FAMILY');
    let planChoice = prompt('Nhap lua chon (1 hoac 2, bo qua neu khong doi): ');
    
    if (planChoice === '1') {
        subscriptions[index].plan = 'PERSONAL';
        subscriptions[index].devices = 2;
    } else if (planChoice === '2') {
        subscriptions[index].plan = 'FAMILY';
        subscriptions[index].devices = 5;
    }
    
    console.log('Cap nhat thanh cong thue bao ma: ' + targetId);
}

function deleteSubscription() {
    console.log('\n=== HUY THUE BAO CLOUD ===');
    let targetId = prompt('Nhap ma thue bao can huy: ');
    let index = subscriptions.findIndex(sub => sub.id === targetId);
    
    if (index === -1) {
        console.log('Khong tim thay thue bao co ma ' + targetId);
        return;
    }
    
    let confirm = prompt('Ban co chac chan muon xoa thue bao ' + targetId + ' khong? (y/n): ');
    if (confirm.toLowerCase() === 'y') {
        subscriptions.splice(index, 1);
        console.log('Da xoa thanh cong thue bao khoi he thong.');
    } else {
        console.log('Huy thao tac xoa.');
    }
}

function main() {
    let menuChoice;
    do {
        console.log('\n========================================');
        console.log('QUAN LY THUE BAO CLOUD - RIKKEISTREAM CLI');
        console.log('========================================');
        console.log('1. Them thue bao moi');
        console.log('2. Xem toan bo danh sách thue bao');
        console.log('3. Cap nhat goi cuoc thue bao');
        console.log('4. Huy thue bao');
        console.log('5. Thoát chuong trinh');
        console.log('----------------------------------------');
        
        menuChoice = prompt('Chon chuc nang (1-5): ');
        
        switch (menuChoice) {
            case '1':
                addSubscription();
                break;
            case '2':
                listSubscriptions();
                break;
            case '3':
                updateSubscription();
                break;
            case '4':
                deleteSubscription();
                break;
            case '5':
                console.log('Tam biet! Cam on ban da su dung ung dụng.');
                break;
            default:
                console.log('Lua chon khong hop le. Vui long chon lai tu 1 den 5!');
        }
    } while (menuChoice !== '5');
}

main();