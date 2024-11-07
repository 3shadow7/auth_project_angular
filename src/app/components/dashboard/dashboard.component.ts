import { AfterViewInit, Component,  OnInit } from '@angular/core';

import {  ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';

import * as echarts from 'echarts';


import { rowData } from '../../shared/constant';

import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { LecturesComponent } from './basicPage/DataCards/Lectures/lectures.component';

import {
  AgGridAngular,
  ICellRendererAngularComp,
  IHeaderAngularComp,

} from 'ag-grid-angular';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
// import 'ag-grid-enterprise';


import { ColDef, ICellRendererParams, IHeaderParams } from 'ag-grid-community';


import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';


import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
export interface HeaderParams {
  icon?: string;
}


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TabViewModule,
    SidebarModule,
    ButtonModule,
     RippleModule,
     AvatarModule,
      StyleClassModule,
      CommonModule,
      TagModule,
      AgGridAngular,
    LecturesComponent,
    FormsModule,
    InputGroupAddonModule ,
    InputGroupModule ,
    InputTextModule ,
    ReactiveFormsModule ,
    CheckboxModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})


export class DashboardComponent implements  AfterViewInit,ICellRendererAngularComp ,OnInit{


  formGroup: FormGroup | undefined;
  windowWidth: any;


  agInit(params: ICellRendererParams<any, any, any>): void {
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true
  }

 ngOnInit(): void {
    this.formGroup = new FormGroup({
      city: new FormControl<string | null>(null)
  });  }


title : any  = {
  1 : 'الصفحة الرئيسية',
  2 : 'تسجيل المقررات',
}
  pageindex : any = 1;



  setpage(page:any){
    this.pageindex = page ;
  }


  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e:any): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible2: boolean = true;

  selectedTabIndex: number = 1;  //? index of the selected tab [in page 1]

  //? method to change active tab
  selectTab(index: number): void {
    this.selectedTabIndex = index;
  }



  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    var chartDom = document.getElementById('main') ;
    var myChart = echarts.init(chartDom);

    var carveDom = document.getElementById('carve') ;
    var mycarve = echarts.init(carveDom);

    window.addEventListener('resize', function () {
      myChart.resize();
      mycarve.resize();
    });

    var option = {
      tooltip: {
        trigger: 'item'
      },

      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['50%', '60%'],
          itemStyle: {
            borderRadius: 10
          },

          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
          },
          padAngle: 5,

          startAngle: 180,
          endAngle: 360,

          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ]
        }
      ]
    };

    var carve = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      center: ['0%', '0%'],
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        },
        {
          data: [600, 800, 700, 900, 1000, 1100, 1200],
          type: 'line',
          smooth: true,
          lineStyle: { color: 'red' }
        }
      ]
    };



    carve && mycarve.setOption(carve);
    option && myChart.setOption(option);


  }



  }









  success_class: string[] = [
    'Yes',
    'Extensive',
    'Active',
    'Monthly',
    'All Android devices',
    'High',
    'High performance',
    'Available',
    '24/7',
    'Regular',
    'Cloud & Local',
    'Singleplayer & Multiplayer',
    'Available',
    '24/7',
    'Regular',
  ];

  warning_class: string[] = [
    'Medium',
    'Optional',
    'Bi-Monthly',
    'Growing',
    'iOS 12 and above',
    'Moderate',
    'Business hours',
    'Variable',
    'Occasional',
    'Cloud only',
    'Singleplayer only',
  ];

  danger_class: string[] = ['No', 'Limited', 'Modern browsers', 'Coming soon'];


  defultCol: ColDef = {
    flex: 4,
    resizable: false,

  };
  //! header of table
  ColDef: ColDef[] = [
    {
      headerName: 'Feature',
      field: 'feature',
      cellClass: 'first-column',
      suppressMovable: true,

    },
    {
      headerName: 'Android',
      field: 'android',

    },
    {
      headerName: 'iOS',
      field: 'ios',

    },
    {
      headerName: 'Web',
      field: 'web',

    },
  ];

  //! rowData of table
  RowDef = rowData;
}







@Component({
  selector: 'grid-header',
  template: `
    <div
      style="display: inline-flex;
        flex-direction: row;
        align-items: baseline;
        flex-wrap: nowrap;
        align-items: center;
        gap: 1em;"
    >
      <p style="margin: 0;font-size: 1.2em;">{{ value }}</p>
      <i style="font-size: 2em;" class="inline bi bi-{{ icon }}"></i>
    </div>
  `,
  styleUrl: './dashboard.component.scss',
})
export class HeaderOfGrid implements IHeaderAngularComp {
  value?: string;
  icon?: string;

  agInit(params: IHeaderParams & HeaderParams): void {
    this.value = params.displayName;
    this.icon = params.icon;
  }
  refresh(params: IHeaderParams<any, any>): boolean {
    return false;
  }
}
